import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Form, Button, ProgressBar } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

function HeroSectionStyleSeven({ navMenuClass }) {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    zipCode: "",
    phone: ""
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/form-questions');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFormCompleted(true);
    }
  };

  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleEmailNext = () => {
    if (validateEmail(userInfo.email)) {
      setIsEmailEntered(true);
    } else {
      alert("Please enter a valid email.");
    }
  };

  const handleEmailBack = () => {
    setIsEmailEntered(false);
    setIsFormCompleted(false);
  };

  const handlePersonalInfoBack = () => {
    setIsFormCompleted(true);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const finalResponses = {
      userEmail: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      phone: userInfo.phone,
      zipcode: userInfo.zipCode,
      responses: Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      })),
    };

    try {
      const res = await fetch('/api/form-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalResponses),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      router.push('/houseDetails');
      console.log('Response saved:', data);
    } catch (error) {
      console.error('Failed to save response:', error);
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'text':
        return (
          <Form.Group key={question._id} className="mb-3">
            <Form.Label>
              <h4 className="text-black">{question.question}</h4>
            </Form.Label>
            {question.options.map((option, index) => (
              <div
                key={index}
                className="mb-3 p-3 border rounded theme-btn-1 btn-effect-1 "
                style={{ cursor: "pointer", transition: "background-color 0.3s" }}
                onClick={() => {
                  handleAnswerChange(question._id, option);
                  handleNextClick();
                }}
              >
                {option}
              </div>
            ))}
          </Form.Group>
        );
      case 'textarea':
        return (
          <Form.Group key={question._id} className="mb-3">
            <Form.Label>
              <h4 className="text-black">{question.question}</h4>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            />
          </Form.Group>
        );
      case 'radio':
        return (
          <Form.Group key={question._id} className="mb-3">
            <Form.Label>
              <h4 className="text-black">{question.question}</h4>
            </Form.Label>
            {question.options.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={option}
                name={question._id}
                onChange={() => handleAnswerChange(question._id, option)}
              />
            ))}
          </Form.Group>
        );
      case 'checkbox':
        return (
          <Form.Group key={question._id} className="mb-3">
            <Form.Label>
              <h4 className="text-black">{question.question}</h4>
            </Form.Label>
            {question.options.map((option, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={option}
                name={question._id}
                onChange={(e) => handleAnswerChange(question._id, option)}
              />
            ))}
          </Form.Group>
        );
      default:
        return null;
    }
  };

  const calculateProgress = () => {
    const totalSteps = questions.length + 2; // Questions + Email + Personal Info
    const currentStep = currentQuestionIndex + (isFormCompleted ? 2 : (isEmailEntered ? 1 : 0));
    return (currentStep / totalSteps) * 100;
  };

  return (
    <div className="ltn__slider-area ltn__slider-6">
      <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
        <div
          className="ltn__slide-item-9 ltn__slide-animation-active bg-overlay-black-60 section-bg-1 bg-image"
          style={{
            backgroundImage: `url("/img/banner/house.jpg")`,
          }}
        >
          <div className="ltn__slide-item-inner">
            <div className="slide-item-info bg-overlay-white-90 text-center">
              <div className="slide-item-info-inner slide-item-info-line-no ltn__slide-animation">
                <div className="slide-item-car-dealer-form">
                  <h3 className="text-center mb-30">
                    Find Your{" "}
                    <span className="ltn__secondary-color-3">Perfect</span>{" "}
                    Home
                  </h3>
                  <div className="py-4">
                    <ProgressBar now={calculateProgress()} />
                  </div>

                  <div className="ltn__car-dealer-form-tab">
                    <AnimatePresence mode="wait">
                      {!isFormCompleted ? (
                        <Form className="ltn__car-dealer-form-box row mb--30">
                          {questions.length > 0 && (
                            <motion.div
                              key={currentQuestionIndex}
                              initial={{ opacity: 0, x: -100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 100 }}
                              transition={{ duration: 0.5 }}
                            >
                              {renderQuestion(questions[currentQuestionIndex])}
                              <Col
                                xs={12}
                                className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar"
                              >
                                <div className="btn-wrapper text-center mt-0">
                                  {currentQuestionIndex > 0 && (
                                    <Button
                                      onClick={handleBackClick}
                                      className="btn theme-btn-1 btn-effect-1 text-uppercase mr-2"
                                    >
                                      Back
                                    </Button>
                                  )}
                                  {(answers[questions[currentQuestionIndex]._id]) && (
                                    <Button
                                      onClick={handleNextClick}
                                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                    >
                                      Next
                                    </Button>
                                  )}
                                </div>
                              </Col>
                            </motion.div>
                          )}
                        </Form>
                      ) : !isEmailEntered ? (
                        <motion.div
                          key="email"
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Form className="ltn__car-dealer-form-box row mb--30">
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <h4 className="text-black">Email</h4>
                              </Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                            <Col
                              xs={12}
                              className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar"
                            >
                              <div className="btn-wrapper text-center mt-0">
                                <Button
                                  onClick={handleEmailBack}
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase mr-2"
                                >
                                  Back
                                </Button>
                                <Button
                                  onClick={handleEmailNext}
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                >
                                  Next
                                </Button>
                              </div>
                            </Col>
                          </Form>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="personal-info"
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Form className="ltn__car-dealer-form-box row mb--30">
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <h4 className="text-black">First Name</h4>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <h4 className="text-black">Last Name</h4>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <h4 className="text-black">Zip Code</h4>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="zipCode"
                                value={userInfo.zipCode}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <h4 className="text-black">Phone</h4>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                            <Col
                              xs={12}
                              className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar"
                            >
                              <div className="btn-wrapper text-center mt-0">
                                <Button
                                  onClick={handlePersonalInfoBack}
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase mr-2"
                                >
                                  Back
                                </Button>
                                <Button
                                  onClick={handleSubmit}
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                >
                                  Submit
                                </Button>
                              </div>
                            </Col>
                          </Form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide-item-img d-none d-md-block">
              <div className="image-titles">
                <h1 className="text-center">{`It's never been easier to own a home!`}</h1>
                <h4 className="text-center">{`Rent To Own listings in Western Province!`}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSectionStyleSeven;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Form, Button } from "react-bootstrap";

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

  const handleEmailNext = () => {
    if (userInfo.email) {
      setIsEmailEntered(true);
    } else {
      alert("Please enter a valid email.");
    }
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

    // alert(JSON.stringify(finalResponses, null, 2));
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'text':
        return (
          <Form.Group key={question._id} className="mb-3">
            <Form.Label>{question.question}</Form.Label>
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
            <Form.Label>{question.question}</Form.Label>
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
            <Form.Label>{question.question}</Form.Label>
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
            <Form.Label>{question.question}</Form.Label>
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



                  <div className="ltn__car-dealer-form-tab">
                    {!isFormCompleted ? (
                      <Form className="ltn__car-dealer-form-box row mb--30">
                        {questions.length > 0 && renderQuestion(questions[currentQuestionIndex])}
                        <Col
                          xs={12}
                          className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar"
                        >
                          <div className="btn-wrapper text-center mt-0">
                            {questions[currentQuestionIndex] && questions[currentQuestionIndex].type !== 'text' && <Button
                              onClick={handleNextClick}
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            >
                              Next
                            </Button>}

                          </div>
                        </Col>
                      </Form>
                    ) : !isEmailEntered ? (
                      <Form className="ltn__car-dealer-form-box row mb--30">
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
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
                              onClick={handleEmailNext}
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            >
                              Next
                            </Button>
                          </div>
                        </Col>
                      </Form>
                    ) : (
                      <Form className="ltn__car-dealer-form-box row mb--30">
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="zipCode"
                            value={userInfo.zipCode}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
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
                              onClick={handleSubmit}
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            >
                              Submit
                            </Button>
                          </div>
                        </Col>
                      </Form>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="slide-item-img">
              <div className="image-titles">
                <h1>{`It's never been easier to own a home!`}</h1>
                <h4>{`Rent To Own listings in Western Province!`}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSectionStyleSeven;

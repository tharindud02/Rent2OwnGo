import { useState, useEffect } from "react";
import { LayoutSix } from "../layouts";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TitleSection from "../components/titleSection";
import HeroSectionStyleSeven from "../components/hero/styleSeven";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function HomeVersionEight(props) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch("/api/houses");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setHouses(data);
      } catch (error) {
        console.error("Failed to fetch houses:", error);
      }
    };

    fetchHouses();
  }, []);

  const handleLinksClick = () => {
    const section = document.getElementById("form-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LayoutSix topbar={true}>
      {/* <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="LjCzPp-MK48"
        onClose={() => setOpen(false)}
      /> */}
      {/* <!-- SLIDER AREA START (slider-11) --> */}
      <div className="ltn__slider-area ltn__slider-11 section-bg-1" id="form-section">
        <HeroSectionStyleSeven />
      </div>

      <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90 plr--7">
        <Container>
          <Row>
            <Col lg={12}>
              <TitleSection
                sectionClasses="text-center"
                headingClasses="section-subtitle-2"
                titleSectionData={{
                  subTitle: "Properties",
                  title: "Featured Listings",
                }}
              />
            </Col>
          </Row>


          <Row>
            <Col lg={12}>
              {houses.length > 0 ? (
                <Row>
                  {houses.map((house, index) => (
                    <Col key={index} md={4} className="mb-4">
                      <Card className="house-card">
                        <Card.Img variant="top" src={house.imageUrls[0]} />
                        <Card.Body>
                          <Card.Text className="price">
                            <span className="price-value">${house.price}</span>
                            <span className="price-type">{house.priceType.toUpperCase()}</span>
                          </Card.Text>
                          <Button
                            onClick={handleLinksClick}
                            className="btn theme-btn-1 btn-effect-1 text-uppercase"
                          >
                            View Listing
                          </Button>
                          <Card.Text className="house-type">{house.houseType.toUpperCase()}</Card.Text>
                          <Card.Text className="rent-type">{house.rentType.toUpperCase()}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p>No houses available.</p>
              )}
            </Col>
          </Row>

        </Container>
      </div>
      {/* PRODUCT SLIDER AREA END */}
      <div className="ltn__product-slider-area ltn__product-gutter pt-8 pb-90 plr--7">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={12}>
              <h2 className="text-center text-black">
                Owning a home is more affordable than you think. Why rent when you can rent to own?
              </h2>
              <Button
                onClick={handleLinksClick}
                className="btn theme-btn-1 btn-effect-1 text-uppercase mt-4"
              >
                Get Started Today!
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutSix>
  );
}

export default HomeVersionEight;

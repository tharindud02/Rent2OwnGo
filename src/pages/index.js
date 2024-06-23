import { useState } from "react";
import { LayoutSix } from "../layouts";
import { Container, Row, Col, Card } from "react-bootstrap";
import TitleSection from "../components/titleSection";
import HeroSectionStyleSeven from "../components/hero/styleSeven";
import { useSelector } from "react-redux";
import ModalVideo from "react-modal-video";
import { useEffect } from "react";


function HomeVersionEight(props) {
  const [isOpen, setOpen] = useState(false);
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const [houses, setHouses] = useState([]);



  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch('/api/houses');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setHouses(data);
      } catch (error) {
        console.error('Failed to fetch houses:', error);
      }
    };

    fetchHouses();
  }, []);

  return (
    <LayoutSix topbar={true}>

      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="LjCzPp-MK48"
        onClose={() => setOpen(false)}
      />
      {/* <!-- SLIDER AREA START (slider-11) --> */}
      <div className="ltn__slider-area ltn__slider-11 section-bg-1">
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
                      <Card>
                        <Card.Img variant="top" src={house.imageUrls[0]} />
                        <Card.Body>
                          <Card.Title>{house.rentType.toUpperCase()}</Card.Title>
                          <Card.Text>
                            <strong>Price:</strong> {house.price}
                            <br />
                            <strong>Price Type:</strong> {house.priceType}
                            <br />
                            <strong>House Type:</strong> {house.houseType}
                          </Card.Text>
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


    </LayoutSix>
  );
}

export default HomeVersionEight;

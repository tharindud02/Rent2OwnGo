import { useState, useEffect } from "react";
import { LayoutSix } from "../../layouts";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
            <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90 plr--7">
                <Container>
                    <Row className="justify-content-center text-center mb-4">
                        <Col lg={8}>
                            <h2>Now is the Time to Check Your Credit!</h2>
                            <p>
                                damith, now is a great time to review your credit report for accuracy,
                                as errors can lower your score. To review yours for free, proceed with
                                our reputable partner below.
                            </p>
                            <h4>
                                Check your credit report for FREE with Capital One Creditwise
                            </h4>
                        </Col>
                    </Row>
                    <Row className="justify-content-center text-center mb-4">
                        <Col lg={4}>
                            <Button
                                onClick={handleLinksClick}
                                className="btn theme-btn-1 btn-effect-1 text-uppercase mt-4"
                                style={{ backgroundColor: "#007bff", borderColor: "#007bff", width: "100%" }}
                            >
                                GET MY CREDIT SCORE!
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center text-center">
                        <Col lg={4}>
                            <Button
                                onClick={handleLinksClick}
                                className="btn theme-btn-1 btn-effect-1 text-uppercase mt-4"
                                style={{ backgroundColor: "#6c757d", borderColor: "#6c757d", width: "100%" }}
                            >
                                No Thank You
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutSix>
    );
}

export default HomeVersionEight;

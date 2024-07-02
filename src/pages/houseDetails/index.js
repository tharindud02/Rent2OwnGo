import { useState, useEffect } from "react";
import { LayoutSix } from "../../layouts";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function HouseDetails(props) {
    const router = useRouter();
    const { houses, userEmail, firstName, lastName, phone, zipcode } = router.query;
    const [linkData, setLinkData] = useState({ myCredit: '', noThanks: '' });

    useEffect(() => {
        if (houses) {
            setHouses(JSON.parse(houses));
        }

        const fetchLinks = async () => {
            try {
                const res = await fetch("/api/links");
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                const links = data.data.reduce((acc, link) => {
                    acc[link.type] = link.link;
                    return acc;
                }, {});
                setLinkData(links);
            } catch (error) {
                console.error("Failed to fetch links:", error);
            }
        };

        fetchLinks();
    }, [houses]);

    const buildLink = (baseLink) => {
        const queryParams = `subid1=${firstName}&subid2=${lastName}&subid3=${zipcode}&subid4=${userEmail}&source_id=${phone}`;
        return baseLink.includes('?') ? `${baseLink}&${queryParams}` : `${baseLink}?${queryParams}`;
    };

    const handleLinksClick = (link) => {
        const urlWithParams = buildLink(link);

        window.location.href = urlWithParams;
    };

    // const alertQueryData = () => {
    //     alert(`User Email: ${userEmail}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nPhone: ${phone}\nZip Code: ${zipcode}`);
    // };

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
                                onClick={() => handleLinksClick(linkData.myCredit)}
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
                                onClick={() => handleLinksClick(linkData.noThanks)}
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

export default HouseDetails;

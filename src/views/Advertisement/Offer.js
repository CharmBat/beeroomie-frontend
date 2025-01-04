import React from "react";
import { Row, Col, Typography, message } from "antd";
import OfferCard from "../../components/OfferCard";
import { useState, useEffect } from "react";
import { getOffers } from "./AdApi";

const { Title } = Typography;

export default function OfferPage() {
  const [offersByYou, setOffersByYou] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
        try {
            const response = await getOffers();
            if(response.error_code === 200){
              setOffersByYou(response.offers);
            }
        } catch (error) {
            message.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        }
    };

    fetchOffers();
  }, []);
  
  const role = localStorage.getItem("userRole");

  const leftOffersByYou = offersByYou.filter((_, index) => index % 2 === 0);
  const rightOffersByYou = offersByYou.filter((_, index) => index % 2 !== 0);

  return (
    <div style={{ padding: "20px", margin: "auto" }}>
      {/* Offers by You */}
      {role === "Roomie" && (
        <div style={{ marginBottom: "32px" }}>
          <Title level={4} style={{ marginBottom: "16px" }}>
            Senin Tekliflerin
          </Title>
          <Row gutter={16}>
            {/* Left Column */}
            <Col xs={24} md={12}>
              {leftOffersByYou.map((offer, index) => (
                <OfferCard key={`byYou-left-${index}`} {...offer} />
              ))}
            </Col>

            {/* Right Column */}
            <Col xs={24} md={12}>
              {rightOffersByYou.map((offer, index) => (
                <OfferCard key={`byYou-right-${index}`} {...offer} />
              ))}
            </Col>
          </Row>
        </div>
      )}

      {/* Other Offers */}
      {role === "Housie" && (
        <div>
          <Title level={4} style={{ marginBottom: "16px" }}>
            Gelen Teklifler
          </Title>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              {leftOffersByYou.map((offer, index) => (
                <OfferCard key={`left-${index}`} {...offer} />
              ))}
            </Col>

            <Col xs={24} md={12}>
              {rightOffersByYou.map((offer, index) => (
                <OfferCard key={`right-${index}`} {...offer} />
              ))}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

import React from "react";
import {Row, Col, Typography, message, Spin} from "antd";
import OfferCard from "../../components/OfferCard";
import { useState, useEffect } from "react";
import { getOffers, withdrawOffer } from "./AdApi";

const { Title } = Typography;

export default function OfferPage() {
  const [offersByYou, setOffersByYou] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
        try {
            const response = await getOffers();
            setOffersByYou(response.offers);
        } catch (error) {
            message.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    fetchOffers();
  }, []);

  const handleWithdrawOffer = async (offerId) => {
    try{
      await withdrawOffer(offerId);
        message.success("Teklif başarıyla geri çekildi.");
        setOffersByYou((prevOffers) => prevOffers.filter((offer) => offer.offer_id !== offerId));
    } catch (error) {
      message.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  };
  
  const role = localStorage.getItem("userRole");

  const leftOffersByYou = offersByYou.filter((_, index) => index % 2 === 0);
  const rightOffersByYou = offersByYou.filter((_, index) => index % 2 !== 0);

    if (loading) {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
                <Spin size="large"/>
            </div>
        );
    }

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
                <OfferCard key={`byYou-left-${index}`} {...offer} isOfferByYou={role === "Roomie" ? true : false} onWithdrawOffer={() => handleWithdrawOffer(offer.offer_id)}/>
              ))}
            </Col>

            {/* Right Column */}
            <Col xs={24} md={12}>
              {rightOffersByYou.map((offer, index) => (
                <OfferCard key={`byYou-right-${index}`}  {...offer} isOfferByYou={role === "Roomie" ? true : false} onWithdrawOffer={() => handleWithdrawOffer(offer.offer_id)} />
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
                <OfferCard key={`left-${index}`}  {...offer} isOfferByYou={role === "Roomie" ? true : false} onWithdrawOffer={() => handleWithdrawOffer(offer.offer_id)} />
              ))}
            </Col>

            <Col xs={24} md={12}>
              {rightOffersByYou.map((offer, index) => (
                <OfferCard key={`right-${index}`}  {...offer} isOfferByYou={role === "Roomie" ? true : false} onWithdrawOffer={() => handleWithdrawOffer(offer.offer_id)} />
              ))}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

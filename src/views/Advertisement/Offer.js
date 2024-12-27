import React from 'react';
import { Row, Col, Typography } from 'antd';
import OfferCard from '../../components/OfferCard';

const { Title } = Typography;

export default function OfferPage() {
    // Mock data for offers
    const mockOffers = [
        {
            adId: 1,
            avatar: "https://via.placeholder.com/64",
            name: "Tom Holland",
            location: "A Single Room in Kağıthane",
            isOfferByYou: true,
        },
        {
            adId: 2,
            avatar: "https://via.placeholder.com/64",
            name: "Sara Rudolph",
            location: "Sarıyerde kocaman oda",
            isOfferByYou: false,
            description: "I am interested in the room, please contact me via WhatsApp.",
            contactDetails: {
                phone: "+9012345678",
                email: "saraaaa98@gmail.com",
            },
        },
        {
            adId: 3,
            avatar: "https://via.placeholder.com/64",
            name: "John Doe",
            location: "A Shared Room in Beşiktaş",
            isOfferByYou: false,
            description: "Looking for a neat roommate, please reach out.",
            contactDetails: {
                phone: "+9023456789",
                email: "john.doe@gmail.com",
            },
        },
        {
            adId: 4,
            avatar: "https://via.placeholder.com/64",
            name: "Emma Watson",
            location: "Cozy Studio in Taksim",
            isOfferByYou: true,
        },
    ];

    const offersByYou = mockOffers.filter((offer) => offer.isOfferByYou);
    const otherOffers = mockOffers.filter((offer) => !offer.isOfferByYou);

    const leftOffersByYou = offersByYou.filter((_, index) => index % 2 === 0);
    const rightOffersByYou = offersByYou.filter((_, index) => index % 2 !== 0);

    const leftOtherOffers = otherOffers.filter((_, index) => index % 2 === 0);
    const rightOtherOffers = otherOffers.filter((_, index) => index % 2 !== 0);

    return (
        <div style={{ padding: '20px', margin: 'auto' }}>
            {/* Offers by You */}
            {offersByYou.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                    <Title level={4} style={{ marginBottom: '16px' }}>
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
            <Title level={4} style={{ marginBottom: '16px' }}>
                Gelen Teklifler
            </Title>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    {leftOtherOffers.map((offer, index) => (
                        <OfferCard key={`left-${index}`} {...offer} />
                    ))}
                </Col>

                <Col xs={24} md={12}>
                    {rightOtherOffers.map((offer, index) => (
                        <OfferCard key={`right-${index}`} {...offer} />
                    ))}
                </Col>
            </Row>
        </div>
    );
}

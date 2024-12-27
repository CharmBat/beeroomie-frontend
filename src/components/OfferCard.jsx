import React from 'react';
import {Card, Row, Col, Avatar, Typography, Button} from 'antd';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

export default function OfferCard({ avatar, name, location, adId, description, isOfferByYou, contactDetails, onWithdrawOffer }) {
    return (
        <Card
            style={{
                background: '#f5f5f5',
                borderRadius: '10px',
                marginBottom: '16px',
            }}
        >
            <Row justify="space-between" align="middle" style={{ height: '100%' }}>
                <Col style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar
                        size={64}
                        src={avatar || process.env.PUBLIC_URL + "/blankAvatar.svg"}
                    />
                    <div>
                        <Title level={5} style={{ marginBottom: '4px' }}>
                            {name}
                        </Title>
                        <Link to={`/advertisement/${adId}`} style={{ textDecoration: 'none', color: '#1890ff' }}>
                            {location}
                        </Link>
                    </div>
                </Col>

                <Col style={{ textAlign: 'right' }}>
                    {isOfferByYou ? (
                        <>
                        <Button type={"primary"} danger onClick={onWithdrawOffer}>
                            Teklifi Geri Çek
                        </Button>
                        </>
                    ) : (
                        <div>
                            {contactDetails && (
                                <>
                                    <Text style={{ display: 'block', fontSize: '0.85rem' }}>
                                        <strong>Phone:</strong> {contactDetails.phone}
                                    </Text>
                                    <Text style={{ display: 'block', fontSize: '0.85rem' }}>
                                        <strong>Email:</strong> {contactDetails.email}
                                    </Text>
                                </>
                            )}
                        </div>
                    )}
                </Col>
            </Row>

            {/* Bottom: Description */}
            <div style={{ marginTop: '8px' }}>
                <Text italic>{description}</Text>
            </div>
        </Card>
    );
}

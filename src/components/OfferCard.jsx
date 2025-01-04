import React from 'react';
import {Card, Row, Col, Avatar, Typography, Button} from 'antd';

const { Text, Title } = Typography;

export default function OfferCard({ ppurl, offerer_name, adId, send_message, isOfferByYou, contact_info, onWithdrawOffer }) {
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
                        src={ppurl || process.env.PUBLIC_URL + "/blankAvatar.svg"}
                    />
                    <div>
                        <Title level={5} style={{ marginBottom: '4px' }}>
                            {offerer_name}
                        </Title>
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
                            {contact_info && (
                                <>
                                    <Text style={{ display: 'block', fontSize: '0.85rem' }}>
                                        <strong>İletişim:</strong> {contact_info}
                                    </Text>
                                </>
                            )}
                        </div>
                    )}
                </Col>
            </Row>

            {/* Bottom: Description */}
            <div style={{ marginTop: '8px' }}>
                <Text italic>{send_message}</Text>
            </div>
        </Card>
    );
}

import React from 'react';
import {Card, Row, Col, Avatar, Typography, Button} from 'antd';
import {Link} from "react-router-dom";

const { Text, Title } = Typography;

export default function OfferCard({ ppurl, offerer_name, other_user_id, send_message, isOfferByYou, contact_info, onWithdrawOffer }) {
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
                    <Link to={`/profile/${other_user_id}`}
                          className="d-flex align-items-center gap-2 justify-content-center">
                        <Avatar
                            size={64}
                            src={ppurl || process.env.PUBLIC_URL + "/blankAvatar.svg"}
                        />
                        <div>
                            <Title level={5} style={{ marginBottom: '4px' }}>
                                {offerer_name}
                            </Title>
                        </div>
                    </Link>
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
                            <Button style={{marginTop:"10px"}} type={"primary"} danger onClick={onWithdrawOffer}>
                                Teklifi Reddet
                            </Button>
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

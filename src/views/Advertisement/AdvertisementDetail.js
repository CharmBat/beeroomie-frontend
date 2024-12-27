import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Spin, Card, Descriptions, Button, Tag, Typography, Collapse } from 'antd';
import ReportModal from '../../components/ReportModal';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function AdDetail() {
    const [adData, setAdData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    useEffect(() => {
        // Bağlanacak API endpointi
        setTimeout(() => {
            const fetchedData = {
                photos: [
                    "https://via.placeholder.com/800x400",
                    "https://via.placeholder.com/800x400/ff0000",
                    "https://via.placeholder.com/800x400/00ff00",
                    "https://via.placeholder.com/800x400/0000ff",
                    "https://via.placeholder.com/800x400/ff00ff",
                    "https://via.placeholder.com/800x400/00ffff",
                ],
                title: "Beşiktaş'ta Lüks Oda",
                user: "User Name",
                location: "Beşiktaş, Levent Mahallesi",
                price: 20000,
                adType: "Oda",
                adDate: "01.01.2024",
                furnished: "Evet",
                genderPreference: "Kadın",
                m2: 120,
                roomCount: "1+0",
                totalFloors: 10,
                floorNumber: 3,
                smoking: "Evet",
                pets: "Hayır",
                description: "Bu ilan Beşiktaş'ta lüks bir odanın ilanıdır. Merkeze yakındır ve tüm ihtiyaçlarınızı karşılar.",
                addressDescription: "Kağıthane, İstanbul, Türkiye",
                suggestions: "Lorem ipsum suggestions data.",
            };
            setAdData(fetchedData);
            setSelectedImage(fetchedData.photos[0] || "");
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    const openReportModal = () => {
        setIsReportModalOpen(true);
    };

    const closeReportModal = () => {
        setIsReportModalOpen(false);
    };

    return (
        <div style={{ padding: '20px', minHeight: '100vh' }}>
            <Row
                gutter={16}
                style={{
                    maxWidth: '1200px',
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'stretch',
                }}
            >
                {/* Left Section */}
                <Col xs={24} md={16} style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Title */}
                    <Title level={3} style={{ marginBottom: '20px' }}>
                        {adData.title}
                    </Title>

                    {/* Main Image */}
                    <Image
                        src={selectedImage}
                        alt="Selected"
                        preview={false}
                        style={{
                            width: '100%',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '10px',
                        }}
                    />

                    {/* Gallery Thumbnails */}
                    <Row gutter={8}>
                        {adData.photos.map((photo, index) => (
                            <Col span={6} key={index}>
                                <Image
                                    src={photo}
                                    alt={`Thumbnail ${index}`}
                                    preview={false}
                                    style={{
                                        width: '100%',
                                        height: '80px',
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                        border:
                                            photo === selectedImage
                                                ? '2px solid #1890ff'
                                                : '2px solid transparent',
                                        borderRadius: '5px',
                                    }}
                                    onClick={() => setSelectedImage(photo)} // Update selected image
                                />
                            </Col>
                        ))}
                    </Row>

                    {/* Collapsible Sections */}
                    <Collapse
                        defaultActiveKey={['1']}
                        style={{ marginTop: '20px', background: '#fff', borderRadius: '8px' }}
                    >
                        <Panel header="Açıklama" key="1">
                            <Text>{adData.description}</Text>
                        </Panel>
                        <Panel header="Adres Tarifi" key="2">
                            <Text>{adData.addressDescription}</Text>
                        </Panel>
                        <Panel header="Öneriler" key="3">
                            <Text>{adData.suggestions}</Text>
                        </Panel>
                    </Collapse>
                </Col>

                {/* Right Section */}
                <Col xs={24} md={8}>
                    <Card
                        style={{
                            borderRadius: '8px',
                            padding: '20px',
                            height: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <Row align="middle" gutter={16} style={{ marginBottom: '20px' }}>
                                <Col>
                                    <img
                                        alt="User Avatar"
                                        src={process.env.PUBLIC_URL + "/blankAvatar.svg"}
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            fontSize: '48px',
                                            borderRadius: '50%',
                                            background: '#f0f0f0',
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Text strong>{adData.user}</Text>
                                    <br/>
                                    <Text type="secondary">{adData.location}</Text>
                                </Col>
                            </Row>
                            <Title level={3} style={{ marginBottom: '10px' }}>
                                <Tag color="green">{adData.price} ₺</Tag>
                            </Title>
                            <Descriptions column={1} size="small" bordered>
                                <Descriptions.Item label="İlan Tipi">{adData.adType}</Descriptions.Item>
                                <Descriptions.Item label="İlan Tarihi">{adData.adDate}</Descriptions.Item>
                                <Descriptions.Item label="Eşyalı">{adData.furnished}</Descriptions.Item>
                                <Descriptions.Item label="Cinsiyet Tercihi">{adData.genderPreference}</Descriptions.Item>
                                <Descriptions.Item label="m²">{adData.m2}</Descriptions.Item>
                                <Descriptions.Item label="Oda Sayısı">{adData.roomCount}</Descriptions.Item>
                                <Descriptions.Item label="Kat Sayısı">{adData.totalFloors}</Descriptions.Item>
                                <Descriptions.Item label="Kat">{adData.floorNumber}</Descriptions.Item>
                                <Descriptions.Item label="Sigara">{adData.smoking}</Descriptions.Item>
                                <Descriptions.Item label="Evcil Hayvan">{adData.pets}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <Row justify="space-between" style={{ marginTop: '20px' }}>
                            <Button type="default" block style={{ marginBottom: '10px' }}>
                                Karşılaştır
                            </Button>
                            <Button type="primary" block style={{ marginBottom: '10px' }}>
                                Teklif Ver
                            </Button>
                            <Button danger block onClick={openReportModal}>
                                Kullanıcıyı Raporla
                            </Button>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <ReportModal
                reportedUserId={adData.userId}
                reportedUserName={adData.user}
                isOpen={isReportModalOpen}
                onClose={closeReportModal}
            />
        </div>
    );
}

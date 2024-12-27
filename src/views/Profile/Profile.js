import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Card, Avatar, Typography, Button, Descriptions, Divider, Row, Col, Badge, Spin} from 'antd';

const { Title, Text } = Typography;

export default function Profile() {
    const { userId } = useParams(); // Extract userId from URL
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // Simulated API call with mock data
        const mockResponse = {
            user_info_list: [
                {
                    full_name: "John Doe",
                    date_of_birth: "1990-01-15",
                    gender: true,
                    smoking: true,
                    pet: false,
                    ppurl: "",
                    about: "A software developer specializing in front-end development and UI/UX design.",
                    contact: "john.doe@example.com",
                    rh: true,
                    department_name: "Computer Science",
                    role: "Admin", // New property to distinguish roles
                },
            ],
        };

        setTimeout(() => {
            setProfileData(mockResponse.user_info_list[0]); // Load mock data
        }, 1000);
    }, [userId]);

    const getBadgeColor = (role) => {
        switch (role) {
            case "Roomie": return "blue";
            case "Housie": return "orange";
            case "Admin": return "purple";
            default: return "blue";
        }
    };

    if (!profileData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', margin: 'auto' }}>
            <Card style={{ borderRadius: '12px', padding: '20px' }}>
                <Row gutter={16}>
                    <Col xs={24} md={12} style={{ textAlign: 'center' }}>
                        <Badge.Ribbon text={profileData.role} color={getBadgeColor(profileData.role)}>
                            <Avatar
                                size={120}
                                src={profileData.ppurl || process.env.PUBLIC_URL + "/blankAvatar.svg"}
                                style={{
                                    marginBottom: '20px',
                                    border: '2px solid #1890ff',
                                }}
                            />
                        </Badge.Ribbon>
                        <Title level={4}>{profileData.full_name}</Title>
                        <Text type="secondary">{profileData.contact}</Text>
                        <Divider />
                        <Title level={4}>About Me</Title>
                        <Text>{profileData.about}</Text>
                    </Col>

                    <Col xs={24} md={12}>
                        <Row justify="end">
                            <Button
                                type="primary"
                                size="large"
                                style={{ borderRadius: '6px', width: '150px' }}
                                onClick={() => navigate(`/edit-profile/${userId}`)} // Navigate with userId
                            >
                                Edit Profile
                            </Button>
                        </Row>
                        <Divider style={{ margin: '20px 0' }} />
                        <Descriptions
                            column={1}
                            bordered
                            style={{ background: '#fff', padding: '15px', borderRadius: '8px' }}
                            labelStyle={{ fontWeight: 'bold', background: '#fafafa' }}
                        >
                            <Descriptions.Item label="Date of Birth">{profileData.date_of_birth}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{profileData.gender ? "Male" : "Female"}</Descriptions.Item>
                            <Descriptions.Item label="Smoking">{profileData.smoking ? "Yes" : "No"}</Descriptions.Item>
                            <Descriptions.Item label="Pet">{profileData.pet ? "Yes" : "No"}</Descriptions.Item>
                            <Descriptions.Item label="RH">{profileData.rh ? "Yes" : "No"}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

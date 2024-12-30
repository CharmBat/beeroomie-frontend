import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, Avatar, Typography, Button, Descriptions, Divider, Row, Col, Badge, Spin, message} from 'antd';
import {getUserProfile} from "./ProfileApi";

const {Title, Text} = Typography;

export default function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await getUserProfile(userId); // Fetch data from API
                if (response?.user_info_list?.length > 0) {
                    setProfileData(response.user_info_list[0]);
                    console.log(response)
                } else {
                    message.error('Seni Bulamadık!');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                message.error('Seni Bulamadık!');
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchProfileData();
    }, [userId]);

    const getBadgeColor = (userRole) => {
        switch (userRole) {
            case "Roomie":
                return "blue";
            case "Housie":
                return "orange";
            case "Admin":
                return "purple";
            default:
                return "blue";
        }
    };

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                <Spin size="large"/>
            </div>
        );
    }

    return (
        <div style={{padding: '20px', margin: 'auto'}}>
            <Card style={{borderRadius: '12px', padding: '20px'}}>
                <Row gutter={16}>
                    <Col xs={24} md={12} style={{textAlign: 'center'}}>
                        <Badge.Ribbon text={userRole} color={getBadgeColor(userRole)}>
                            <Avatar
                                size={120}
                                src={profileData.ppurl = "string" ? process.env.PUBLIC_URL + "/blankAvatar.svg" : (profileData.ppurl || process.env.PUBLIC_URL + "/blankAvatar.svg")}
                                style={{
                                    marginBottom: '20px',
                                    border: '2px solid #1890ff',
                                }}
                            />
                        </Badge.Ribbon>
                        <Title level={4}>{profileData.full_name}</Title>
                        <Text type="secondary">{profileData.contact}</Text>
                        <Divider/>
                        <Title level={4}>Hakkımda</Title>
                        <Text>{profileData.about}</Text>
                    </Col>

                    <Col xs={24} md={12}>
                        <Row justify="end">
                            <Button
                                type="primary"
                                size="large"
                                style={{borderRadius: '6px', width: '150px'}}
                                onClick={() => navigate(`/edit-profile/${userId}`)} // Navigate with userId
                            >
                                Edit Profile
                            </Button>
                        </Row>
                        <Divider style={{margin: '20px 0'}}/>
                        <Descriptions
                            column={1}
                            bordered
                            style={{background: '#fff', padding: '15px', borderRadius: '8px'}}
                            labelStyle={{fontWeight: 'bold', background: '#fafafa'}}
                        >
                            <Descriptions.Item label="Doğum Tarihi">{profileData.date_of_birth}</Descriptions.Item>
                            <Descriptions.Item
                                label="Cinsiyet">{profileData.gender ? "Erkek" : "Kadın"}</Descriptions.Item>
                            <Descriptions.Item
                                label="Sigara Kullanımı">{profileData.smoking ? "Evet" : "Hayır"}</Descriptions.Item>
                            <Descriptions.Item
                                label="Evcil Hayvan">{profileData.pet ? "Evet" : "Hayır"}</Descriptions.Item>
                            <Descriptions.Item label="Fakülte">{profileData.department_name}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

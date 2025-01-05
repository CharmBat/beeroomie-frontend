import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Card, Avatar, Typography, Button, Descriptions, Divider, Row, Col, Badge, Spin, message} from 'antd';
import {getUserProfile} from "./ProfileApi";

const {Title, Text} = Typography;

export default function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState("Roomie");
    const userId = useParams().userId;
    const meId = localStorage.getItem('userId');
    const isMyProfile = userId === meId;

    useEffect(() => {
        if (isMyProfile) {
            setUserRole(localStorage.getItem('userRole'));
        }
    }, [isMyProfile]);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await getUserProfile(userId);
                if (response?.user_info_list?.length > 0) {
                    setProfileData(response.user_info_list[0]);
                    if (!isMyProfile){
                        setUserRole(response.user_info_list[0].rh ? "Housie" : "Roomie");
                    }
                } else {
                    message.error('Seni Bulamadık!');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                message.error('Seni Bulamadık!');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [userId, isMyProfile]);

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                <Spin size="large"/>
            </div>
        );
    }

    const roleColors = {
        Roomie: '#1677ff',
        Housie: 'orange',
        Admin: 'mediumpurple',
    }
    const roleColor = roleColors[userRole] || 'gray';

    return (
        <div style={{padding: '20px', margin: 'auto'}}>
            <Card style={{borderRadius: '12px', padding: '20px'}}>
                <Row gutter={16}>
                    <Col xs={24} md={12} style={{textAlign: 'center', marginBottom:"30px"}}>
                        <Badge.Ribbon text={userRole} color={roleColor}>
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
                        <Divider/>
                        <Title level={4}>Hakkımda</Title>
                        <Text>{profileData.about}</Text>
                    </Col>

                    <Col xs={24} md={12}>
                        { isMyProfile ?
                            <>
                                <Row justify="end">
                                    <Button
                                        type="primary"
                                        size="large"
                                        style={{borderRadius: '6px', width: '150px', marginRight: '20px',
                                        background: roleColor
                                    }}
                                        onClick={() => navigate(`/change-password/${userId}`)}
                                    >
                                        Şifre Değiştir
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="large"
                                        style={{borderRadius: '6px', width: '150px',
                                        background: roleColor
                                    }}
                                        onClick={() => navigate(`/edit-profile/${userId}`)}
                                    >
                                        Profilini Düzenle
                                    </Button>
                                </Row>
                                <Divider style={{margin: '20px 0'}}/>
                            </>
                            : null}
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

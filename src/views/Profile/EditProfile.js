import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, Avatar, Form, Input, Button, Divider, Row, Col, Badge, Upload, Spin, message, Select} from 'antd';
import {UploadOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import {TwoRadio} from '../../components/FilterRadio';
import {getUserProfile, updateUserProfile} from './ProfileApi';
import {photoUpload} from "../MiscApi";
import {departments} from '../../components/departments';

export default function EditProfile() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [ppurl, setPpurl] = useState(process.env.PUBLIC_URL + "/blankAvatar.svg");
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await getUserProfile(userId); // Fetch data from API
                if (response?.user_info_list?.length > 0) {
                    const userProfile = response.user_info_list[0];
                    setProfileData(userProfile);
                    setPpurl(userProfile.ppurl || process.env.PUBLIC_URL + "/blankAvatar.svg");
                    form.setFieldsValue(userProfile);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [userId, form]);

    const handleFormSubmit = async (values) => {
        const updatedProfile = {...values, ppurl, userid_fk: userId, rh: profileData.rh};
        try {
            await updateUserProfile(userId, updatedProfile);
            message.success('Profilin başarıyla güncellendi!');
            navigate(`/profile/${userId}`);
        } catch (error) {
            console.error('Güncelleme Başarısız:', error);
            message.error('Güncelleme Başarısız. Lütfen tekrar deneyin.');
        }
    };

    const handleAvatarChange = async (info) => {
        console.log("Info:", info);
        const file = info.file;
        console.log("File:", file);
        if (!file) {
            message.error("Lütfen bir dosya seçin.");
            return;
        }
        try {
            const response = await photoUpload(file);
            if (response) {
                setPpurl(response);
                message.success("Fotoğraf başarıyla yüklendi!");
            } else {
                message.error("Fotoğraf yüklenemedi. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            console.error("Fotoğraf yüklenemedi:", error);
            message.error("Fotoğraf yüklenemedi. Lütfen tekrar deneyin.");
        }
    };


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
                                src={ppurl}
                                style={{
                                    marginBottom: '20px',
                                    border: '2px solid #1890ff',
                                }}
                            />
                        </Badge.Ribbon>
                        <Upload
                            name="ppurl"
                            listType="picture"
                            showUploadList={false}
                            onChange={handleAvatarChange}
                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined/>}>Fotoğraf Değiştir</Button>
                        </Upload>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFormSubmit}
                        >
                            <Form.Item
                                label="İsmin"
                                name="full_name"
                                rules={[{required: true, message: 'İsmini Bilmeliyiz'}]}
                            >
                                <Input placeholder=""/>
                            </Form.Item>
                            <Form.Item
                                label="Doğum Tarihin"
                                name="date_of_birth"
                                rules={[{required: true, message: 'Ne zaman doğdun?'}]}
                            >
                                <Input type="date"/>
                            </Form.Item>
                            <TwoRadio
                                label="Cinsiyetin"
                                name="gender"
                                options={[
                                    {label: 'Erkek', value: true},
                                    {label: 'Kadın', value: false},
                                ]}
                            />
                            <TwoRadio
                                label="Sigara Kullanımı"
                                name="smoking"
                                options={[
                                    {label: 'Evet', value: true},
                                    {label: 'Hayır', value: false},
                                ]}
                            />
                            <TwoRadio
                                label="Evcil Hayvan"
                                name="pet"
                                options={[
                                    {label: 'Evet', value: true},
                                    {label: 'Hayır', value: false},
                                ]}
                            />
                            <Form.Item
                                label="İletişim Bilgilerin"
                                name="contact"
                                rules={[
                                    {required: true, message: 'İletişim bilgilerini girmelisin!'},
                                ]}
                            >
                                <Input placeholder=""/>
                            </Form.Item>

                            <Form.Item
                                label="Fakülte"
                                name="departmentid_fk"
                                rules={[{ required: true, message: 'Lütfen bir fakülte seçin!' }]}
                            >
                                <Select
                                    placeholder="Fakülte Seçiniz"
                                    options={departments.map((dept) => ({
                                        label: dept.department_name,
                                        value: dept.department_id,
                                    }))}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Hakkımda"
                                name="about"
                                rules={[{ required: true, message: 'Hakkında bir şeyler yaz!' }]}
                            >
                                <Input.TextArea rows={4} placeholder=""/>
                            </Form.Item>

                            <Divider style={{margin: '20px 0'}}/>
                            <Row justify="end" align="middle" style={{marginBottom: '20px'}}>
                                <Button
                                    type="default"
                                    icon={<ArrowLeftOutlined/>}
                                    style={{marginRight: '10px'}}
                                    onClick={() => navigate(-1)}
                                >
                                    Geri Dön
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => form.submit()}
                                >
                                    Kaydet
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

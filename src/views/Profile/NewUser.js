import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Card, Button, Form, Input, Row, Col, Badge, Avatar, Upload, message, Select, Spin} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { TwoRadio } from '../../components/FilterRadio';
import {createUserProfile, department} from './ProfileApi';
import {photoUpload} from "../MiscApi";
import {sendLogoutRequest} from "../Auth/AuthApi";

export default function NewUser({setIsLoggedIn}) {
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [ppurl, setPpurl] = useState(process.env.PUBLIC_URL + "/blankAvatar.svg");
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await department();
                setDepartments(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchDepartments()
    }, []);

    const handleFormSubmit = async (values) => {
        const userData = { ...values, ppurl };
        const userDataWithRh = { ...userData, userid_fk: 0, rh: false };
        try {
            await createUserProfile(userDataWithRh);
            message.success('Bilgilerini Başarıyla Aldık! Lütfen Tekrar Giriş Yap.');
            await sendLogoutRequest(token);
            localStorage.removeItem('authToken');
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error(error);
            message.error('Bir Sorun oluştu :(');
        }
    };

    const handleAvatarChange = async (info) => {
        const file = info.file;
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

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                <Spin size="large"/>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', margin: 'auto' }}>
            <Card style={{ borderRadius: '12px', padding: '20px' }}>
                <Row gutter={16}>
                    {/* Left Section */}
                    <Col xs={24} md={12} style={{ textAlign: 'center' }}>
                        <Badge.Ribbon text="Yeni Kullanıcı" color="blue">
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
                            <Button icon={<UploadOutlined />}>Fotoğraf Yükle</Button>
                        </Upload>
                    </Col>

                    {/* Right Section */}
                    <Col xs={24} md={12}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFormSubmit}
                        >
                            <Form.Item
                                label="İsmin"
                                name="full_name"
                                rules={[{ required: true, message: 'İsmini Bilmeliyiz' }]}
                            >
                                <Input placeholder="Lütfen tam adını gir." />
                            </Form.Item>

                            <Form.Item
                                label="Doğum Tarihin"
                                name="date_of_birth"
                                rules={[{ required: true, message: 'Ne zaman doğdun?' }]}
                            >
                                <Input type="date" />
                            </Form.Item>

                            <TwoRadio
                                label="Cinsiyetin"
                                name="gender"
                                options={[
                                    { label: 'Erkek', value: true },
                                    { label: 'Kadın', value: false },
                                ]}
                                rules={[{ required: true, message: 'Cinsiyetin nedir?' }]}
                            />

                            <TwoRadio
                                label="Sigara Kullanımın"
                                name="smoking"
                                options={[
                                    { label: 'Evet', value: true },
                                    { label: 'Hayır', value: false },
                                ]}
                                rules={[{ required: true, message: 'Sigara kullanır mısın?' }]}
                            />

                            <TwoRadio
                                label="Evde hayvan bulunmasına izin verir misin?"
                                name="pet"
                                options={[
                                    { label: 'Evet', value: true },
                                    { label: 'Hayır', value: false },
                                ]}
                                rules={[{ required: true, message: 'Hayvan sever misin?' }]}
                            />

                            <Form.Item
                                label="Kendin Hakkında"
                                name="about"
                                rules={[{ required: true, message: 'Herkese kendini biraz tanıt.' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Senin alanın." />
                            </Form.Item>

                            <Form.Item
                                label="İletişim Bilgilerin"
                                name="contact"
                                rules={[
                                    { required: true, message: 'Sana nasıl ulaşabiliriz?' },
                                ]}
                            >
                                <Input placeholder="İnsanlar sana nasıl ulaşsın" />
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
                                        value: dept.departmentid,
                                    }))}
                                />
                            </Form.Item>


                            <Row justify="end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ borderRadius: '6px' }}
                                >
                                    Kaydet ve Devam Et
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

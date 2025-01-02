import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form, Input, Row, Col, Badge, Avatar, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { TwoRadio } from '../../components/FilterRadio';
import { createUserProfile } from './ProfileApi';
import { departments }  from '../../components/departments';


export default function NewUser() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [ppurl, setppurl] = useState(process.env.PUBLIC_URL + "/blankAvatar.svg");

    const handleFormSubmit = async (values) => {
        const userData = { ...values, ppurl };
        console.log("Submitting data:", userData);
        try {
            await createUserProfile(userData);
            message.success('Bilgilerini Başarıyla Aldık!');
            navigate('/');
        } catch (error) {
            message.error('Bir Sorun oluştu :(');
        }
    };

    const handleAvatarChange = (info) => {
        const file = info.file.originFileObj || info.file;
        try {
            const imageUrl = URL.createObjectURL(file);

            // Revoke old preview URL to avoid memory leaks
            if (ppurl) {
                URL.revokeObjectURL(ppurl);
            }

            setppurl(imageUrl); // Update ppurl state with new preview URL
        } catch (error) {
            message.error("Fotoğraf yüklenirken bir hata oluştu.");
        }
    };



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
                                <Input placeholder="@ olan" />
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

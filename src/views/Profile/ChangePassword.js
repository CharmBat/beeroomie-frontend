import {Button, Form, Input, Typography, message, Space} from 'antd';
import {useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined} from "@ant-design/icons";
import React from "react";
import { sendResetPaswordRequest } from '../Auth/AuthApi';

const {Title} = Typography;

export default function ChangePassword() {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    const onFinish = async (values) => {
        try {
            await sendResetPaswordRequest(token, values.newPassword);
            message.success('Şifreniz başarıyla değiştirildi!');
            navigate(`/profile/${userId}`);
        } catch (error) {
            console.error('Change password failed:', error);
            message.error('Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
                transform: "translateY(-10%)",
            }}
        >
            <Title level={2}>Şifreni Değiştir</Title>
            <Form
                name="change-password"
                style={{width: "300px", marginTop: "20px"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="currentPassword"
                    rules={[
                        {required: true, message: 'Lütfen mevcut şifrenizi girin!'},
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Mevcut Şifre"/>
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    rules={[
                        {required: true, message: 'Lütfen yeni şifrenizi girin!'},
                        {min: 6, message: 'Şifre en az 6 karakter olmalıdır!'},
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Yeni Şifre"/>
                </Form.Item>

                <Form.Item
                    name="confirmNewPassword"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                        {required: true, message: 'Lütfen yeni şifrenizi onaylayın!'},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Yeni Şifreyi Onayla"/>
                </Form.Item>

                <Space size="large" style={{marginTop: "10px", alignItems:"normal"}}>
                    <Button
                        type="default"
                        icon={<ArrowLeftOutlined/>}
                        style={{marginRight: '10px'}}
                        onClick={() => navigate(-1)}
                    >
                        Geri Dön
                    </Button>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Değiştir
                        </Button>
                    </Form.Item>
                </Space>


            </Form>
        </div>
    );
}

import { Button, Form, Input, Typography, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { sendRegisterRequest } from './AuthApi';

const { Title } = Typography;

export default function Register() {

    const navigate = useNavigate();

    const onFinish = async (values) => {
        try{
            const { email, password } = values;
            const response = await sendRegisterRequest({ email, password });
            if(response.error_status === 201){
                message.success('Kayıt başarılı! Lütfen mailinizi kontrol edin.');
                navigate('/login');
            }
            else{
                message.error(response.system_message);
            }
        }
        catch(error){
            console.error('Register failed:', error);
            message.error('Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
        }
}

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            transform: "translateY(-10%)" // Adjust as needed
        }}>
            <Title level={2}>Kaydol</Title>
            <Form
                name="register"
                style={{ width: "300px", marginTop: "20px" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                {/* Email Field */}
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Lütfen e-posta adresinizi girin!' },
                        { type: 'email', message: 'Geçerli bir e-posta girin!' }
                    ]}
                >
                    <Input placeholder="E-posta" />
                </Form.Item>

                {/* Password Field */}
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Lütfen şifrenizi girin!' },
                        { min: 6, message: 'Şifre en az 6 karakter olmalıdır!' }
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Şifre" />
                </Form.Item>

                {/* Confirm Password Field */}
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Lütfen şifrenizi onaylayın!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Şifreyi Onayla" />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Kaydol
                    </Button>
                </Form.Item>
            </Form>

            {/* Additional Links */}
            <Space size="large" style={{ marginTop: "10px" }}>
                <Link to="/login">
                    <Button type="default">Giriş Yap</Button>
                </Link>
                <Link to="/forgot-password">
                    <Button type="link">Şifremi Unuttum</Button>
                </Link>
            </Space>
        </div>
    );
}

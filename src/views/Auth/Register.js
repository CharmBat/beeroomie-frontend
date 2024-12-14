import { Button, Form, Input, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function Register() {

    const onFinish = (values) => {
        console.log('Success:', values); // Replace with registration logic
    };

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

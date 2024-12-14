import { Button, Form, Input, Typography, Space, message } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function ForgotPassword() {

    const onFinish = (values) => {
        console.log('Email Sent to:', values.email);  // Replace with actual password reset logic
        message.success("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!");
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
        message.error("Lütfen geçerli bir e-posta adresi girin!");
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
            <Title level={2}>Şifremi Unuttum</Title>
            <Form
                name="forgotPassword"
                style={{ width: "300px", marginTop: "20px" }}
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

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Şifremi Sıfırla
                    </Button>
                </Form.Item>
            </Form>

            {/* Navigation Links */}
            <Space size="large" style={{ marginTop: "10px" }}>
                <Link to="/login">
                    <Button type="default">Giriş Yap</Button>
                </Link>
                <Link to="/register">
                    <Button type="default">Kaydol</Button>
                </Link>
            </Space>
        </div>
    );
}

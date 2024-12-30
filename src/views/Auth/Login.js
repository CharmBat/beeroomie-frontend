import {Button, Form, Input, Typography, Space, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { sendLoginRequest, userMe } from './AuthApi';

const { Title, Text } = Typography;

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            // Call login endpoint
            const response = await sendLoginRequest(values);
            if(response.error_status === 200){
                message.success('Giriş başarılı!');

                // Store token in local storage
                localStorage.setItem('authToken', response.access_token);

                const userInfo = await userMe();
                if (userInfo === null) {
                    localStorage.setItem('userId', null);
                    localStorage.setItem('userName', null);
                    localStorage.setItem('userPic', null);
                    localStorage.setItem('userRole', 'NewUser');
                }
                else {
                    localStorage.setItem('userId', userInfo.user.userid);
                    localStorage.setItem('userName', userInfo.user.full_name);
                    localStorage.setItem('userPic', userInfo.user.ppurl);
                    const role = userInfo.user.role ? "Admin" : userInfo.user.rh ? "Housie" : "Roomie";
                    localStorage.setItem('userRole', role);
                }

                // Set login state and navigate to homepage
                setIsLoggedIn(true);
                navigate('/');
            }
            else{
                message.error(response.system_message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            message.error('Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    const handleGuestLogin = () => {
        setIsLoggedIn(true);  // DEĞİŞECEK
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            transform: "translateY(-10%)"
        }}>
            <Title level={2}>Giriş Yap</Title>
            <Form
                name="login"
                style={{ width: "300px", marginTop: "20px" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Lütfen e-posta adresinizi girin!' },
                        { type: 'email', message: 'Geçerli bir e-posta girin!' }
                    ]}
                >
                    <Input placeholder="E-posta" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                >
                    <Input.Password placeholder="Şifre" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Giriş Yap
                    </Button>
                </Form.Item>
            </Form>

            <Space size="large" style={{ marginTop: "10px" }}>
                <Link to="/register">
                    <Button type="default">Kaydol</Button>
                </Link>
                <Link to="/forgot-password">
                    <Button type="link">Şifremi Unuttum</Button>
                </Link>
            </Space>

            <div style={{ marginTop: "30px" }}> {/* DEĞİŞECEK */}
                <Button type="dashed" block onClick={handleGuestLogin}>
                    Şifresiz Giriş
                </Button>
                <Text type="secondary" style={{ marginTop: "5px", display: "block" }}>
                    Geçici olarak siteye erişim için "Şifresiz Giriş" butonunu kullanabilirsiniz.
                </Text>
            </div>
        </div>
    );
}

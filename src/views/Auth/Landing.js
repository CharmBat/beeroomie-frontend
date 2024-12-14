import { Button, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function Landing() {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            transform: "translateY(-15%)"
        }}>
            <Title level={2}>Hoşgeldiniz!</Title>
            <Space size="large">
                <Link to="/login">
                    <Button type="primary" size="large">Giriş Yap</Button>
                </Link>
                <Link to="/register">
                    <Button type="default" size="large">Kaydol</Button>
                </Link>
            </Space>
        </div>
    );
}
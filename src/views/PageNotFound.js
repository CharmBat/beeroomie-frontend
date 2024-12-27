import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

export default function PageNotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <div style={{ maxWidth: '600px', margin: 'auto' }}>
                <img
                    src={`${process.env.PUBLIC_URL}/404.svg`}
                    alt="404 Page Not Found"
                    style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}
                />
                <Title level={3}>Böyle bir sayfa yok!</Title>
                <Text type="secondary">Gerçekten yok...</Text>
                <div style={{ marginTop: '20px' }}>
                    <Link to="/">
                        <Button type="primary" size="large">Beni Kurtar</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
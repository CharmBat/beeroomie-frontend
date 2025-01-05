import React from 'react';
import { Card, Typography, Button, Space } from 'antd';
import {Link} from "react-router-dom";

const { Text } = Typography;

const AdminCard = ({ report, onDecline, onBan }) => {
    return (
        <Card style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <Space direction="vertical" size="small">
                <Link to={`/profile/${report.reporter_id}`} className="text-decoration-none" ><Text><strong>Raporlayan:</strong> {report.reporter}</Text></Link>
                <Link to={`/profile/${report.reportee_id}`} className="text-decoration-none"><Text><strong>Raporlanan:</strong> {report.reportee}</Text></Link>
                <Text><strong>Sebep:</strong> {report.description}</Text>
                <Text><strong>Tarih:</strong> {report.report_date}</Text>
                <Space>
                    <Button type="primary" onClick={() => onDecline(report.report_id)}>Reddet</Button>
                    <Button danger onClick={() => onBan(report.report_id, report.reportee_id, report.description || "yok")}>Kullanıcıyı Engelle</Button>
                </Space>
            </Space>
        </Card>
    );
};

export default AdminCard;

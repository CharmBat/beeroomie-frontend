import React, { useState, useEffect } from 'react';
import { Table, Button, Avatar, message, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {banUser, deleteReport, getReportedUsers} from "./MiscApi";

const { Text } = Typography;

export default function AdminPanel() {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReportedUsers = async () => {
            try {
                const response = await getReportedUsers();
                setReportData(response);
            } catch (error) {
                console.error('Hata:', error);
                message.error('Raporlar yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };
        fetchReportedUsers();
    }, []);

    const handleDecline = async (id) => {
        try {
            await deleteReport(id);
            message.success(`Rapor başarıyla silindi.`);
            setReportData((prevData) => prevData.filter((item) => item.report_id !== id));
        } catch (error) {
            console.error('Rapor silinirken bir hata oluştu:', error);
            message.error('Rapor silinirken bir hata oluştu.');
        }
    };


    const handleBanUser = async (reportId, userId) => {
        try {
            await banUser(userId);
            message.success(`Kullanıcı başarıyla engellendi.`);
            await handleDecline(reportId);
        } catch (error) {
            console.error('Kullanıcı engellenirken bir hata oluştu:', error);
            message.error('Kullanıcı engellenirken bir hata oluştu.');
        }
    };


    const columns = [
        {
            title: 'Raporlayan',
            dataIndex: 'reporter',
            key: 'reporter',
            render: (text) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar icon={<UserOutlined />} />
                    {text}
                </div>
            ),
        },
        {
            title: 'Raporlanan',
            dataIndex: 'reportee',
            key: 'reportee',
            render: (text) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar icon={<UserOutlined />} />
                    {text}
                </div>
            ),
        },
        {
            title: 'Sebep',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
                <Text
                    style={{
                        display: 'block',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        maxWidth: '300px',
                    }}
                >
                    {text}
                </Text>
            ),
        },
        {
            title: 'Tarih',
            dataIndex: 'report_date',
            key: 'report_date',
        },
        {
            title: 'Aksiyon',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button type="link" onClick={() => handleDecline(record.report_id)}>
                        Reddet
                    </Button>
                    <Button type="link" danger onClick={() => handleBanUser(record.reportee_id)}>
                        Kullanıcıyı Engelle
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '40px' }}>
            <Table
                columns={columns}
                dataSource={reportData.map((item) => ({
                    ...item,
                    key: item.report_id,
                }))}
                loading={loading}
                bordered
                style={{ background: '#fff' }}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Table, Button, Avatar, message, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function AdminPanel() {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to fetch report data
        const mockResponse = {
            report_list: [
                {
                    report_id: 1,
                    reporter: "Dwayne Johnson",
                    reportee: "John Cena",
                    description: "Inappropriate behavior that needs immediate attention due to its severity.",
                    report_date: "2024-12-27",
                },
                {
                    report_id: 2,
                    reporter: "Emily Blunt",
                    reportee: "Chris Evans",
                    description: "Spamming ads and creating nuisance in the community section of the platform.",
                    report_date: "2024-12-26",
                },
            ],
            user_message: "Reports fetched successfully",
            error_status: 0,
            system_message: "OK",
        };

        setTimeout(() => {
            if (mockResponse.error_status === 0) {
                setReportData(mockResponse.report_list);
            } else {
                message.error(mockResponse.user_message || "Failed to fetch reports");
            }
            setLoading(false);
        }, 1000);
    }, []);

    const handleDecline = (id) => {
        console.log(`Declined report with ID: ${id}`);
        setReportData((prevData) => prevData.filter((item) => item.report_id !== id));
    };

    const handleBanUser = (id) => {
        console.log(`Banned user reported in report ID: ${id}`);
        // Add your ban user logic here
    };

    const columns = [
        {
            title: 'Reporter',
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
            title: 'Reported',
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
            title: 'Description',
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
            title: 'Date',
            dataIndex: 'report_date',
            key: 'report_date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button type="link" onClick={() => handleDecline(record.report_id)}>
                        Decline
                    </Button>
                    <Button type="link" danger onClick={() => handleBanUser(record.report_id)}>
                        Ban User
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

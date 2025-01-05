import React, { useState, useEffect } from 'react';
import {Col, Empty, message, Row, Spin} from 'antd';
import AdminCard from '../components/AdminCard';
import { banUser, deleteReport, getReportedUsers } from './MiscApi';

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

    const handleBanUser = async (reportId, userId, banReason) => {
        try {
            await banUser(userId, banReason);
            message.success(`Kullanıcı başarıyla engellendi.`);
            await deleteReport(reportId);
            setReportData((prevData) => prevData.filter((item) => item.report_id !== reportId));
        } catch (error) {
            console.error('Kullanıcı engellenirken bir hata oluştu:', error);
            message.error('Kullanıcı engellenirken bir hata oluştu.');
        }
    };

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                <Spin size="large"/>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            {reportData.length > 0 ? (
                <Row gutter={[16, 16]}>
                    {reportData.map((report) => (
                        <Col key={report.report_id} xs={24} sm={12} md={8} lg={6}>
                            <AdminCard
                                report={report}
                                onDecline={handleDecline}
                                onBan={handleBanUser}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty
                    style={{ marginTop: '20px' }}
                    imageStyle={{ height: 60 }}
                    description={
                        <span>Henüz bir rapor yok.</span>
                    }
                />
            )}
        </div>
    );
}

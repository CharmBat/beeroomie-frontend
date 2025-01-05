import React, { useState } from 'react';
import {Modal, Input, Button, message} from 'antd';
import {reportUser} from "../views/MiscApi";

const { TextArea } = Input;

export default function ReportModal({ reportedUserId, reportedUserName, isOpen, onClose }) {
    const [description, setDescription] = useState('');

    const handleReport = async () => {
        const report = {reportee: reportedUserId, description};
        try {
            await reportUser(report);
            message.success('Kullanıcı başarıyla raporlandı.');
            onClose();
        } catch (error) {
            console.error('Rapor oluşturulurken bir hata oluştu:', error);
            message.error('Rapor oluşturulurken bir hata oluştu.');
        }
    };

    return (
        <Modal
            title={`${reportedUserName} adlı kullanıcı rapor ediliyor`}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div style={{ marginBottom: '20px', borderTop: '1px' }}>
                <TextArea
                    rows={4}
                    maxLength={100}
                    placeholder="Şikayetinizi detaylı bir şekilde açıklayın"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button onClick={onClose}>Vazgeç</Button>
                <Button type="primary" danger onClick={handleReport}>
                    Raporla
                </Button>
            </div>
        </Modal>
    );
}

import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const { TextArea } = Input;

export default function ReportModal({ reportedUserId, reportedUserName, isOpen, onClose }) {
    const [description, setDescription] = useState('');

    const handleReport = () => {
        console.log('Reported User ID:', reportedUserId);
        console.log('Report Description:', description);
        onClose();
        // Add your API call here to submit the report
        /*
        fetch('/api/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reportedUserId, description }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        */
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

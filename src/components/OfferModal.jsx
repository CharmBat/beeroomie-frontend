import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { createOffer } from '../views/Advertisement/AdApi';

const { TextArea } = Input;

export default function OfferModal({ adId, isOpen, onClose }) {
    const [description, setDescription] = useState('');

    const handleOffer = async () => {
        const offerData = {adId, description}; 
        try{
            await createOffer(offerData);
            message.success("Teklifiniz başarıyla gönderildi.");
        } catch(error){
            message.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        }
    };

    return (
        <Modal
            title={`Teklif gönder`}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div style={{ marginBottom: '20px', borderTop: '1px' }}>
                <TextArea
                    rows={4}
                    maxLength={100}
                    placeholder="Teklifinize eklemek istediğiniz notları buraya yazabilirsiniz."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button onClick={onClose}>Vazgeç</Button>
                <Button type="primary" onClick={handleOffer}>
                    Teklif Ver
                </Button>
            </div>
        </Modal>
    );
}

import React, { useState } from 'react';
import { Form, Input, Button, Upload, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TwoRadio, ThreeRadio } from '../../components/FilterRadio'; // Adjust path if needed

export default function PublishAdvertisement() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Fotoğraf Yükle</div>
        </div>
    );

    const handleFormSubmit = (values) => {
        console.log('Form Values:', values);
        console.log('Uploaded Images:', fileList);
        // endpoint bağlanıcak
    };

    return (
        <div style={{ padding: '20px', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1000px', margin: 'auto', padding: '20px' }}>
                {/* Image Upload */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                >
                    <Form.Item name="photos" label="">
                        <Upload
                            action="/upload" // Placeholder action for now
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleChange} // buraya before upload eklenecek form gönderilirken cdne gidicek şimdi hata veriyo
                            showUploadList={{       // ayrıca form en az 1 resim olmadan gönderilemiyecek
                                showPreviewIcon:false
                            }}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="input1"
                                rules={[{ required: true, message: 'Bu alan zorunludur!' }]}
                            >
                                <Input placeholder="Placeholder 1" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="input2"
                                rules={[{ required: true, message: 'Bu alan zorunludur!' }]}
                            >
                                <Input placeholder="Placeholder 2" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="input3"
                                rules={[{ required: true, message: 'Bu alan zorunludur!' }]}
                            >
                                <Input placeholder="Placeholder 3" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* TwoRadio Component */}
                    <TwoRadio
                        label="Eşyalı mı?"
                        name="furnished"
                        options={[
                            { label: 'Evet', value: 'yes' },
                            { label: 'Hayır', value: 'no' },
                        ]}
                    />

                    {/* ThreeRadio Component */}
                    <ThreeRadio
                        label="Cinsiyet Tercihi"
                        name="genderPreference"
                        options={[
                            { label: 'Erkek', value: 'male' },
                            { label: 'Kadın', value: 'female' },
                            { label: 'Farketmez', value: 'none' },
                        ]}
                    />

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Formu Gönder
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

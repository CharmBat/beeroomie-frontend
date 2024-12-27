import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Card, Avatar, Typography, Form, Input, Button, Divider, Row, Col, Badge, Upload, Spin} from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { TwoRadio } from '../../components/FilterRadio'; // Import your custom Radio components

const { Title } = Typography;

export default function EditProfile() {
    const { userId } = useParams(); // Extract userId from URL
    const navigate = useNavigate(); // For navigation
    const [form] = Form.useForm();
    const [profileData, setProfileData] = useState(null);
    const [avatar, setAvatar] = useState(process.env.PUBLIC_URL + "/blankAvatar.svg");

    useEffect(() => {
        // Simulated API call with mock data
        const mockResponse = {
            user_info_list: [
                {
                    full_name: "John Doe",
                    date_of_birth: "1990-01-15",
                    gender: true, // true for Male, false for Female
                    smoking: true,
                    pet: false,
                    about: "A software developer specializing in front-end development and UI/UX design.",
                    contact: "john.doe@example.com",
                    rh: true,
                    role: "Roomie", // Role: Roomie, Housie, Admin
                },
            ],
        };

        setTimeout(() => {
            const userProfile = mockResponse.user_info_list[0];
            setProfileData(userProfile);
            form.setFieldsValue(userProfile); // Populate form with initial values
        }, 1000);
    }, [userId, form]);

    const handleFormSubmit = (values) => {
        console.log("Updated Profile Data:", { userId, ...values });
        console.log("Avatar URL:", avatar);
    };

    const handleAvatarChange = (info) => {
        if (info.file.status === 'done') {
            setAvatar(URL.createObjectURL(info.file.originFileObj)); // Simulate successful upload
        }
    };

    const getBadgeColor = (role) => {
        switch (role) {
            case "Roomie": return "blue";
            case "Housie": return "orange";
            case "Admin": return "purple";
            default: return "blue";
        }
    };

    if (!profileData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', margin: 'auto' }}>
            <Card style={{ borderRadius: '12px', padding: '20px' }}>
                <Row gutter={16}>
                    {/* Left Section */}
                    <Col xs={24} md={12} style={{ textAlign: 'center' }}>
                        <Badge.Ribbon text={profileData.role} color={getBadgeColor(profileData.role)}>
                            <Avatar
                                size={120}
                                src={avatar}
                                style={{
                                    marginBottom: '20px',
                                    border: '2px solid #1890ff',
                                }}
                            />
                        </Badge.Ribbon>
                        <Upload
                            name="avatar"
                            listType="picture"
                            showUploadList={false}
                            onChange={handleAvatarChange}
                            beforeUpload={() => false} // Prevent automatic upload
                        >
                            <Button icon={<UploadOutlined />}>Change Photo</Button>
                        </Upload>
                        <Divider />
                        <Title level={4}>About Me</Title>
                        <Form.Item name="about">
                            <Input.TextArea rows={4} placeholder="Tell us about yourself" />
                        </Form.Item>
                    </Col>

                    {/* Right Section */}
                    <Col xs={24} md={12}>
                        {/* Action Buttons */}
                        <Row justify="end" align="middle" style={{ marginBottom: '20px' }}>
                            <Button
                                type="default"
                                icon={<ArrowLeftOutlined />}
                                style={{ marginRight: '10px' }}
                                onClick={() => navigate(-1)} // Go back to the previous page
                            >
                                Go Back
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => form.submit()} // Trigger form submission
                            >
                                Save Changes
                            </Button>
                        </Row>

                        {/* Form Fields */}
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFormSubmit}
                        >
                            <Form.Item
                                label="Full Name"
                                name="full_name"
                                rules={[{ required: true, message: 'Please enter your full name!' }]}
                            >
                                <Input placeholder="Enter your full name" />
                            </Form.Item>

                            <Form.Item
                                label="Date of Birth"
                                name="date_of_birth"
                                rules={[{ required: true, message: 'Please enter your date of birth!' }]}
                            >
                                <Input type="date" />
                            </Form.Item>

                            <TwoRadio
                                label="Gender"
                                name="gender"
                                options={[
                                    { label: 'Male', value: true },
                                    { label: 'Female', value: false },
                                ]}
                            />

                            <TwoRadio
                                label="Smoking"
                                name="smoking"
                                options={[
                                    { label: 'Yes', value: true },
                                    { label: 'No', value: false },
                                ]}
                            />

                            <TwoRadio
                                label="Pet Ownership"
                                name="pet"
                                options={[
                                    { label: 'Yes', value: true },
                                    { label: 'No', value: false },
                                ]}
                            />

                            <TwoRadio
                                label="RH Status"
                                name="rh"
                                options={[
                                    { label: 'Yes', value: true },
                                    { label: 'No', value: false },
                                ]}
                            />

                            <Form.Item
                                label="Contact"
                                name="contact"
                                rules={[
                                    { required: true, message: 'Please enter your contact information!' },
                                    { type: 'email', message: 'Please enter a valid email!' },
                                ]}
                            >
                                <Input placeholder="Enter your contact information" />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

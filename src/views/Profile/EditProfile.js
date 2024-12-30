import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Typography, Form, Input, Button, Divider, Row, Col, Badge, Upload, Spin, message } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { TwoRadio } from '../../components/FilterRadio';
import { getUserProfile, updateUserProfile } from './ProfileApi'; // Add updateUserProfile

const { Title } = Typography;

export default function EditProfile() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [ppurl, setPpurl] = useState(process.env.PUBLIC_URL + "/blankAvatar.svg");
    // const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await getUserProfile(userId); // Fetch data from API
                if (response?.user_info_list?.length > 0) {
                    const userProfile = response.user_info_list[0];
                    // setProfileData(userProfile);
                    setPpurl(userProfile.ppurl || process.env.PUBLIC_URL + "/blankAvatar.svg");
                    form.setFieldsValue(userProfile); // Set form fields with fetched data
                } else {
                    message.error('User profile not found!');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                message.error('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [userId, form]);

    const handleFormSubmit = async (values) => {
        const updatedProfile = { ...values, ppurl }; // Include ppurl in the update
        try {
            await updateUserProfile(userId, updatedProfile); // Call the update API
            message.success('Profile updated successfully!');
            navigate(`/profile/${userId}`); // Navigate back to the profile page
        } catch (error) {
            console.error('Error updating profile:', error);
            message.error('Failed to update profile.');
        }
    };

    const handleAvatarChange = (info) => {
        const file = info.file.originFileObj;
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPpurl(imageUrl); // Set the new ppurl
        }
    };

    const getBadgeColor = (userRole) => {
        switch (userRole) {
            case "Roomie":
                return "blue";
            case "Housie":
                return "orange";
            case "Admin":
                return "purple";
            default:
                return "blue";
        }
    };


    if (loading) {
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
                    <Col xs={24} md={12} style={{ textAlign: 'center' }}>
                        <Badge.Ribbon text={userRole} color={getBadgeColor(userRole)}>
                            <Avatar
                                size={120}
                                src={ppurl}
                                style={{
                                    marginBottom: '20px',
                                    border: '2px solid #1890ff',
                                }}
                            />
                        </Badge.Ribbon>
                        <Upload
                            name="ppurl"
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

                    <Col xs={24} md={12}>
                        <Row justify="end" align="middle" style={{ marginBottom: '20px' }}>
                            <Button
                                type="default"
                                icon={<ArrowLeftOutlined />}
                                style={{ marginRight: '10px' }}
                                onClick={() => navigate(-1)}
                            >
                                Go Back
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => form.submit()}
                            >
                                Save Changes
                            </Button>
                        </Row>
                        <Divider style={{ margin: '20px 0' }} />
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
                            {/*<Form.Item*/}
                            {/*    label="Fakülte"*/}
                            {/*    name="department_name"*/}
                            {/*    rules={[*/}
                            {/*        { required: true, message: 'Please enter your contact information!' },*/}
                            {/*        { type: 'email', message: 'Please enter a valid email!' },*/}
                            {/*    ]}*/}
                            {/*>*/}
                            {/*    <Input placeholder="Enter your contact information" />*/}
                            {/*</Form.Item>*/}
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

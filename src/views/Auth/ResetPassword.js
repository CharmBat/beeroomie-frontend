import { useNavigate, useParams } from "react-router-dom"
import {Button, Form, Input, Typography, message} from 'antd';
import { sendResetPaswordRequest } from "./AuthApi";

export default function ResetPassword() {

    const { Title } = Typography;

    const {token} = useParams();

    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const {password} = values;
            const response = await sendResetPaswordRequest(token, password);
            if(response.error_status === 200){
                message.success('Şifreniz başarıyla değiştirildi!');
                navigate('/');
            }
            else{
                message.error(response.system_message);
            }
        } catch (error) {
            console.error('Reset password failed:', error);
            message.error('Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            transform: "translateY(-10%)"
        }}>
            <Title level={2}>Şifreni Sıfırla</Title>
            <Form
                name="reset-password"
                style={{ width: "300px", marginTop: "20px" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Lütfen yeni şifrenizi girin!' },
                        { min: 6, message: 'Şifre en az 6 karakter olmalıdır!' }
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Yeni Şifre" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Lütfen yeni şifrenizi onaylayın!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Yeni Şifreyi Onayla" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Değiştir
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
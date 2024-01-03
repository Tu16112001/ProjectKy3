
import React from 'react'
import { BackgroundPage } from './style'
import diamond1 from '../../Image/ic.png'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input ,message} from 'antd';
import { Footer } from "../../Components/Footer/index"
import axios from 'axios';
export const Sigup = () => {
    const onFinish = async (values) => {
        try {
            // Gửi yêu cầu POST đến API endpoint
            const response = await axios.post('http://103.166.182.247:600/users/register', {
                email: values.gmail,
                password: values.ConfirmPassword,
                fullName: values.fullname,
            });

            // Kiểm tra phản hồi từ API
            console.log(response.data);

            // Kiểm tra nếu đăng ký thành công
            if (response.data.success) {
                message.success('Đăng ký thành công!');
            } else {
                // Nếu có lỗi đăng ký, hiển thị thông báo lỗi
                message.error(response.data.message || 'Đăng ký thất bại. Vui lòng thử lại sau.');
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            message.error('Đăng ký thất bại. Vui lòng thử lại sau.');
        }
    };


    const validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Confirm Password does not match with Password!'));
        },
    });


    return (
        <div>
            <BackgroundPage>
                <div style={{ background: "black", opacity: "0.7" }}>
                    <h3 style={{ fontSize: "26px", color: "white", paddingTop: "100px" }}>Register to your account</h3>

                    <div>
                        ________________________________
                        <img src={diamond1} width='60px' height='60px' />
                        <img src={diamond1} width='90px' height='90px' />
                        <img src={diamond1} width='60px' height='60px' />
                        ________________________________
                    </div>
                    <h2 style={{ paddingBottom: "80px" }}>Always bringing you beautiful jewelry</h2>
                </div>
            </BackgroundPage>


            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "140px" }}>
                <h3 style={{ fontSize: "26px", padding: "50px 0 0 0" }}>SIGN UP IN HERE</h3>
                <p style={{ paddingBottom: "30px" }}>If you don't have an account yet, register here.</p>
                <Form
                    style={{ maxWidth: "500px", minWidth: "340px" }}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="fullname"
                       
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="gmail"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="abc@gmail.com" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="ConfirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please input your Confirm Password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Confirm Password does not match with Password!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>



                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Register
                        </Button>

                    </Form.Item>
                </Form>

            </div>

            <Footer />
        </div>
    )
}
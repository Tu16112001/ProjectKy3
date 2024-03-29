import React from 'react'
import { BackgroundPage } from './style'
import diamond1 from '../../Image/ic.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from "axios"
import { Footer } from "../../Components/Footer/index"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate('/')
  }
  const onFinish = async (values) => {
    try {

      const response = await axios.post('http://103.166.182.247:3001/users/login', {
        email: values.email,
        password: values.password

      });



      if (response.data.isSucess) {
        // Save fullname and token to local storage
        const { fullName } = response.data.data.user;
        const { id: userId } = response.data.data.user;
        const { accessToken } = response.data.data;
        const { id: cartId } = response.data.data.cart;
        // Save fullName and accessToken to local storage
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('cartId', cartId);
        localStorage.setItem('userID', userId);

        const cartResponse = await axios.get(`http://103.166.182.247:3001/carts/${cartId}`, {
          headers: {
            'x_authorization': accessToken,
          },
        });

        const cartItemsLength = cartResponse.data.data.cart.items.length;
        localStorage.setItem('cartItemsLength', cartItemsLength);
        // Authentication successful
        message.success('Login successful!');

        // Navigate to the home page
        const productId = localStorage.getItem('productId');
        if (productId !== null) {
          navigate(`/ProductDetail/${productId}`);
        } else {
          handleNavigateHome();
          localStorage.removeItem('productId');
        }

      } else {
        // Authentication failed
        message.error(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Login failed. Please try again later.');
    }
  };

  // Now you can use these values as needed, for example, log them to the console

  return (
    <div>
      <BackgroundPage>
        <div style={{ background: "black", opacity: "0.7" }}>
          <h3 style={{ fontSize: "26px", color: "white", paddingTop: "100px" }}>Sign in to your account</h3>

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
        <h3 style={{ fontSize: "26px", padding: "50px 0 0 0" }}>SIGN IN HERE</h3>
        <p style={{ paddingBottom: "30px" }}>If you already have an account, log in here.</p>
        <Form
          style={{ maxWidth: "500px", minWidth: "340px" }}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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


          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>

          </Form.Item>
        </Form>

      </div>
      <Footer />
    </div>
  )
}

export default Login

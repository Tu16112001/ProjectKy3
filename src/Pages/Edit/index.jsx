import React, { useState, useEffect } from 'react';
import { Form, Input, Button ,message} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BackgroundPage} from './style'
export const Edit = () => {
const Navigate = useNavigate()
const productIdForEdit = localStorage.getItem('productIdForEdit');
       
    
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: '',
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const cartId = localStorage.getItem('cartId');
    
    axios.get(`http://103.166.182.247:3001/carts/${cartId}`, {
      headers: {
        'x_authorization': accessToken,
      },
    })
    .then(response => {
      const { data } = response.data;
  
      // Update state with the received data
      setFormData({
        fullName: data.cart.fullName,
        mobile: data.cart.mobile,
        address: data.cart.address,
      });
      form.setFieldsValue({
        fullName: data.cart.fullName,
        mobile: data.cart.mobile,
        address: data.cart.address,
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [form]);

  const onFinish = (values) => {
    const cartId = localStorage.getItem('cartId');
    const accessToken = localStorage.getItem("accessToken");
  
    axios.put(`http://103.166.182.247:3001/carts/${cartId}`, values, {
      headers: {
        'x_authorization': accessToken,
      },
    })
      .then(response => {
        console.log('API Response:', response.data);
        // Handle any further logic or state updates as needed
        message.success('Update successful!');
        if (productIdForEdit) {
            Navigate(`/ProductDetail/${productIdForEdit}`);
            localStorage.removeItem('productIdForEdit');
          } else {
            Navigate(`/`);
          }
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <BackgroundPage style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
      <h1 style={{margin:"160px 0 0 0"}}>EDIT YOUR INFORMATION <br /> HERE</h1>
      <Form
        form={form}
        style={{ width: "20%", marginTop: "10px" }}
        onFinish={onFinish}
        initialValues={formData}
      >
        <Form.Item name="fullName" rules={[{ required: true, message: 'Please input your full name!' }]}>
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item name="mobile" rules={[{ required: true, message: 'Please input your mobile number!' }]}>
          <Input placeholder="Mobile" />
        </Form.Item>
        <Form.Item name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </BackgroundPage>
  );
};


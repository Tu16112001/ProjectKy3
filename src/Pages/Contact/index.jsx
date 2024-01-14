import React from "react";
import { Form, Input, Button, Row, Col, Space } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { BackgroundPage } from "./style";
export const ContactPage = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
    // Add your logic to handle form submission, e.g., send data to a server
  };

  return (
    <BackgroundPage>
    <Row justify="center" style={{ paddingTop: "50px" }}>
      <Col span={8}>
        <h1 style={{color:"blue"}}>Contact Us</h1>
        <Form name="contact" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number!" }]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item
            name="location"
            rules={[{ required: true, message: "Please enter your location!" }]}
          >
            <Input
              prefix={<EnvironmentOutlined className="site-form-item-icon" />}
              placeholder="Location"
            />
          </Form.Item>
          <Form.Item
            name="message"
            rules={[{ required: true, message: "Please enter your message!" }]}
          >
            <Input.TextArea
              prefix={<MessageOutlined className="site-form-item-icon" />}
              placeholder="Message"
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </BackgroundPage>
  )
}
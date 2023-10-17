"use client";
import React, { useState } from "react";
import { Button, Form, Input, Card, Col, Row } from "antd";
import axios from "axios";

type FieldType = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const [form] = Form.useForm<FieldType>();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const onFinish = async (values: FieldType) => {
    console.log("Success:", values);

    await axios({
      method: "post",
      url: "http://localhost:8080/api/auth/signup",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        alert("Đăng kí thành công!"), console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
        <Card bordered={false}>
          <h1 style={{display: 'flex',justifyContent: 'center'}}>Sign Up</h1>
          <Form 
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 650 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
            labelAlign="left"
            size="large"
          >
            <Form.Item<FieldType>
              label="Fullname"
              name="fullname"
              rules={[{ required: true, min: 6, max: 20 }]}
            >
              <Input placeholder="Full name" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[{ required: true, min: 6, max: 20 }]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item<FieldType>
              label="E-mail"
              name="email"
              rules={[{ required: true, min: 6, max: 255 }, { type: "email" }]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, min: 8 }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item<FieldType>
              label="ConfirmPassword"
              name="confirmPassword"
              rules={[
                { required: true, min: 8 },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
  );
};

export default Signup;

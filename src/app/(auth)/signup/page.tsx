"use client";
import React, { useState } from "react";
import { Button, Form, Input, Card, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { signup } from "@/app/services/userService";

const SignUp = () => {
const [signupDetail, setSignupDetail] = useState({
  username: "",
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const handleChange = (event: any, field: any) => {
  let actualValue = event.target.value;
  setSignupDetail({
    ...signupDetail,
    [field]: actualValue,
  });
};
const handleSubmit = async (event: any) => {
  try {
    const successSignup = await signup(signupDetail);
    console.log(JSON.parse(JSON.stringify(successSignup)));
  } catch (error) {
    console.log(error);
  }
};

  return (
        <Card bordered={false}>
          <h1 style={{display: 'flex',justifyContent: 'center'}}>Sign Up</h1>
          <Form 
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 650 }}
            onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
            labelAlign="left"
            size="large"
          >
            <Form.Item
              label="Fullname"
              name="fullname"
              rules={[{ required: true, min: 6, max: 20 }]}
            >
              <Input placeholder="Full name" onChange={(e) => handleChange(e, "fullname")}/>
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, min: 6, max: 20 }]}
            >
              <Input placeholder="Username" onChange={(e) => handleChange(e, "username")}/>
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, min: 6, max: 255 }, { type: "email" }]}
            >
              <Input placeholder="E-mail" onChange={(e) => handleChange(e, "email")}/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, min: 8 }]}
            >
              <Input.Password placeholder="Password" onChange={(e) => handleChange(e, "password")}/>
            </Form.Item>

            <Form.Item
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
                        "ConfirmPassword không trùng với Password!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" onChange={(e) => handleChange(e, "confirmPassword")}/>
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
export default SignUp;

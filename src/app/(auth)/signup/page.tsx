"use client";
import React, { useState } from "react";
import { Button, Form, Input, Card, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { signup } from "@/app/services/userService";

interface SignupDetail {
  username: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const router = useRouter();
  const [form] = Form.useForm<SignupDetail>();

  const handleSubmit = async (data: SignupDetail) => {
    try {
      const response = await signup(data);
      if(response.status){
        //@ts-ignore
        message.success(response.message);
        router.push("/signin");
      }else{
        //@ts-ignore
        message.error(response.message);
        message.error("Đăng kí thất bại!")
      }
    } catch (error) {
      //@ts-ignore
      message.error(error.response.data.message);
      message.error("Đăng kí thất bại!")
    }
  };

  return (
    <Card bordered={false}>
      <h1 style={{ textAlign: "center" }}>Đăng kí</h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 650 }}
        form={form}
        onFinish={handleSubmit}
        labelAlign="left"
        size="large"
      >
        <Form.Item
          label="Họ và tên"
          name="fullname"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            { min: 6, max: 20, message: "Tên đăng nhập từ 6-20 kí tự!" },
          ]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập Email!" },
            { type: "email", message: "Email không đúng định dạng!" },
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!"},
          { min: 8, max: 20, message: "Mật khẩu từ 8-20 kí tự!" }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          rules={[
            { required: true, message: "Vui lòng nhập xác nhân mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Xác nhận mật khẩu không trùng với mật khẩu!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu" />
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

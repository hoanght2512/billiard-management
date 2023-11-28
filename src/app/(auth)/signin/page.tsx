"use client";
import { login } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Form, Input, message, Card } from "antd";
import { LoginDetail } from "@/lib/interfaceBase";

const Signin = () => {
  const [form] = Form.useForm<LoginDetail>();

  const success = () => {
    message.success("Đăng nhập thành công!");
  };

  const handleSubmit = async (data: LoginDetail) => {
    try {
      const jwtTokenData = await login(data);
      console.log(JSON.parse(JSON.stringify(jwtTokenData)));
      const error = () => {
        //@ts-ignore
        message.error(jwtTokenData.message);
      };
      //@ts-ignore
      if (JSON.parse(JSON.stringify(jwtTokenData?.tokenType)) === "Bearer") {
        window.location.reload();
      }
      // console.log(jwtTokenData.status);
      //@ts-ignore
      if (JSON.parse(JSON.stringify(jwtTokenData?.tokenType)) === "Bearer") {
        success();
      } else {
        error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={{ width: 600}}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <h1>Đăng nhập</h1>
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập!",
            },
          ]}
        >
          <Input type="username" placeholder="Nhập tên đăng nhập" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password  type="password" placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Signin;

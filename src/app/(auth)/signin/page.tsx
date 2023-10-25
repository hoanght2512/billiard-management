"use client";
import { login } from "@/app/services/userService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Form, Input, message, Card } from "antd";

const Signin = () => {
  const success = () => {
    message.success("Đăng nhập thành công!");
  };

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (event: any, field: any) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };
  const handleSubmit = async (event: any) => {
    try {
      const jwtTokenData = await login(loginDetail);
      console.log(JSON.parse(JSON.stringify(jwtTokenData)));
      const error = () => {
        //@ts-ignore
        message.error(jwtTokenData.message);
      };
      if (JSON.parse(JSON.stringify(jwtTokenData.status)) === true) {
        // router.push("/restaurant");
        window.location.reload();
      }
      console.log(jwtTokenData.status);
      if (jwtTokenData.status) {
        success();
      } else {
        error();
      }
      // (Hàng debug của Rin Lê :v)
      // const token = JSON.parse(JSON.stringify(jwtTokenData.token));
      // document.cookie = `jwt_token=${jwtTokenData.token}; expires=${new Date(Date.now() + 1000)}; path=/`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={{ width: 700}}>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        onSubmitCapture={(e) => e.preventDefault}
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
          <Input
            type="username"
            placeholder="Nhập tên đăng nhập"
            onChange={(e) => handleChange(e, "username")}
          />
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
          <Input
            type="password"
            placeholder="Nhập mật khẩu"
            onChange={(e) => handleChange(e, "password")}
          />
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

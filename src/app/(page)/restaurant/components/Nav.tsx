"use client";
import React, { useState } from "react";
import { Button, Flex, Menu, MenuProps } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/app/hooks/use-auth";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const Nav = () => {
  const router = useRouter();
  const logOut = () => {
    deleteCookie("access_token");
    window.location.reload();
  };
  const { data } = useAuth();
  //@ts-ignore
  const username = data?.username;
  const items: MenuProps["items"] = [
    {
      label: username ? (
        username
      ) : (
        <Button onClick={() => router.push("/signin")}>Đăng nhập</Button>
      ),
      key: "SubMenu",
      //   icon: <SettingOutlined />,
      children: data
        ? [
            {
              key: "1",
              label: "Thông tin tài khoản",
            },
            {
              key: "2",
              danger: true,
              label: <a onClick={() => logOut()}>Đăng xuất</a>,
            },
          ]
        : [],
    },
  ];
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      theme="light"
      mode="horizontal"
      selectedKeys={[current]}
      items={items}
      style={{justifyContent: "flex-end"}}
    />
  );
};
export default Nav;

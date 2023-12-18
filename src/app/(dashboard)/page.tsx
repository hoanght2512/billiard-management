"use client";
import React, { Suspense, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  TableOutlined,
  VideoCameraOutlined,
  BorderlessTableOutlined,
  ShopOutlined,
  WalletOutlined,
  UngroupOutlined,
  TeamOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";

import AppRoomCTRL from "../(crud)/RoomCRUD/page";
import { isBrowser } from "@/utils/is-browser";
import AppUnitCTRL from "../(crud)/UnitCRUD/page";
import AppCategoryCTRL from "../(crud)/CategoryCRUD/page";
import AppAreaCTRL from "../(crud)/AreaCRUD/page";
import Link from "next/link";
import AppProductCTRL from "../(crud)/ProductCRUD/page";
import AppCustomerCTRL from "../(crud)/CustomerCRUD/page";
import AppOrderCTRL from "../(crud)/Order/page";
import AppUserCTRL from "../(crud)/UserCRUD/page";
import Main from "./layout/Main";
import Home from "@/app/(dashboard)/pages/home";
import ReactDOM from "react-dom";
import RootLayout from "./layout";

const { Header, Sider, Content } = Layout;
const App = () => {
  return (
    <div className="App">
      <RootLayout />
    </div>
  );
};

export default App;

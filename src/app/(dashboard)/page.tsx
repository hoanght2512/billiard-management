"use client";
import React, { Suspense, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,TableOutlined,
  VideoCameraOutlined,
  BorderlessTableOutlined,
  ShopOutlined,
  WalletOutlined,
  UngroupOutlined,
  TeamOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate, BrowserRouter } from "react-router-dom";
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
const { Header, Sider, Content } = Layout;
const App: React.FC = () => {
  // const [editing, setEdit] = useState(false);
  

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorBgContainerDisabled },
  } = theme.useToken();
  const [tabType, setTabType] = useState("1");
  // const params = useParams();
  // const location = useLocation();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
        }}
      >
        <div className="logo" style={{ padding: 10, textAlign: "center" }}>
          <h1>DASHBOARD</h1>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => {
            console.log(e);
            setTabType(e.key);
            // navigate(`/${e.key}`);
            navigate(e.key);
          }}
          items={[
            
            {
              key: "1",
              icon: <TableOutlined />,
              label: "Quản lý bàn",
            },
            {
              key: "2",
              icon: <BorderlessTableOutlined />,
              label: "Quản lý khu vực",
            },
            {
              key: "3",
              icon: <ShopOutlined />,
              label: "Quản lý sản phẩm",
            },
            {
              key: "4",
              icon: <WalletOutlined />,
              label: "Quản lý đơn vị sản phẩm",
            },
            {
              key: "5",
              icon: <UngroupOutlined />,
              label: "Quản lý danh mục",
            },
            {
              key: "6",
              icon: <TeamOutlined />,
              label: "Quản lý khách hàng",
            },
            {
              key: "7",
              icon: <AccountBookOutlined />,
              label: "Quản lý hóa đơn",
            },
            {
              key: "8",
              icon: <UserOutlined />,
              label: "Quản lý tài khoản",
            },
          ]}
        />
      </Sider>
      <Layout style={{ background: colorBgContainerDisabled }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            background: colorBgContainer,
            padding: 0,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Link href="/restaurant">Trang thu ngân</Link>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainerDisabled,
          }}
        >
          {+tabType === 1 && <AppRoomCTRL />}
          {+tabType === 2 && <AppAreaCTRL />}
          {+tabType === 3 && <AppProductCTRL />}
          {+tabType === 4 && <AppUnitCTRL />}
          {+tabType === 5 && <AppCategoryCTRL />}
          {+tabType === 6 && <AppCustomerCTRL />}
          {+tabType === 7 && <AppOrderCTRL />}
          {+tabType === 8 && <AppUserCTRL />}
          {/* <Button>
            <span>Button</span>
          </Button> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default function RootLayout() {
  const [initialRenderComplete, setInitialRenderComplete] =
    React.useState(false);
  React.useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  if (!initialRenderComplete) {
    return null;
  } else {
    if (isBrowser) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      );
    }

    return null;
  }
}

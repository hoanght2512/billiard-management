"use client";
import React, { useState } from "react";
import {
  Card,
  Space,
  Table,
  Modal,
  Button,
  Form,
  Row,
  Col,
  Input,
  Spin,
  Descriptions,
  Popconfirm,
  DatePicker,
  Checkbox,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { IOrder, IOrderDetail } from "../interfaceOrder";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import { findAllByOrderId } from "@/app/services/orderDetailService";

interface IProps {
  onDelete: (orderId: number) => void;
  data: IOrder[];
  loading: boolean;
}

const formatCurrency = (value: number | undefined) => {
  if (typeof value !== "number") {
    return "N/A";
  }
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
const OrderController: React.FC<IProps> = ({ onDelete, data, loading }) => {
  const [order, setOrder] = useState<IOrder>();
  const [orderDetails, setOrderDetails] = useState<IOrderDetail>();

  const handleEdit = async (record: IOrder) => {
    const response = await findAllByOrderId(record.id);
    //@ts-ignore
    setOrderDetails(response?.content);
    setOrder({ ...record });
    // onEdit(record);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Bạn có muốn xóa ?",
      okText: "Yes",
      okType: "danger",
      width: "600px",
      onOk: () => {
        onDelete(id);
      },
    });
  };

  const columns: ColumnsType<IOrder> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search ID"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      onFilter: (value: any, record: any) =>
        record.id.toString().toLowerCase().includes(value.toLowerCase()),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Bàn",
      dataIndex: ["room", "name"],
      key: "room.name",
      sorter: (a, b) => a.room.name.length - b.room.name.length,
    },
    {
      title: "Khu vực",
      dataIndex: ["room", "area", "name"],
      key: "room.area.name",
      sorter: (a, b) => a.room.name.length - b.room.name.length,
    },
    // {
    //   title: "User",
    //   dataIndex: ["user", "username"],
    //   key: "user.username",
    //   sorter: (a, b) => a.user.username.length - b.user.username.length,
    // },
    // {
    //   title: "Khách hàng",
    //   dataIndex: ["customer", "name"],
    //   key: "customer.name",
    //   sorter: (a, b) => a.customer.name.length - b.customer.name.length,
    // },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</>
      ),
      sorter: (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => (
        <>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</>
      ),
      sorter: (a, b) => dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
    },
    // {
    //   title: "CreatedBy",
    //   dataIndex: "createdBy",
    //   key: "createdBy",
    // },
    // {
    //   title: "UpdatedBy",
    //   dataIndex: "updatedBy",
    //   key: "updatedBy",
    // },
    {
      title: "isCanceled",
      dataIndex: "canceled",
      key: "canceled",
      sorter: (a, b) => Number(a.canceled) - Number(b.canceled),
      filters: [{text: "True", value : true}, {text: "False", value: false}],
       //@ts-ignore
      onFilter: (value: boolean , record) => record.canceled === value,
      render: (canceled: boolean) => (canceled ? "True" : "False"),
    },
    {
      title: "Action",
      key: "action",  
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <EyeOutlined />
            View
          </a>
          <a onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const pageSizeOptions = ["5", "10", "20"];

  const footer = () => {
    //@ts-ignore
    const totalCost = orderDetails?.reduce((acc, detail) => {
      return acc + detail.quantity * detail.product.price;
    }, 0);

    return (
      <div>
        <strong>Thành tiền:</strong> {formatCurrency(totalCost)}
      </div>
    );
  };

  return (
    <Card>
      <h2>Danh sách hóa đơn</h2>
      <Spin spinning={loading} tip="Loading..." size="large">
        <Table
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: pageSizeOptions,
            defaultPageSize: Number(pageSizeOptions[0]),
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            showLessItems: true, // Ẩn bớt nút trang khi có nhiều trang
          }}
          columns={columns}
          scroll={{ x: 1000 }}
          //@ts-ignore
          dataSource={data?.content?.map((order) => ({
            ...order,
            key: order.id,
          }))}
        />
      </Spin>
      <Modal
        title="Chi tiết hóa đơn"
        open={!!order}
        width={1000}
        onCancel={() => {
          setOrder(undefined);
        }}
        onOk={() => {
          setOrder(undefined);
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => setOrder(undefined)}
          >
            OK
          </Button>,
        ]}
      >
        <Row>
          <Descriptions
            labelStyle={{ fontWeight: "bolder" }}
            contentStyle={{ fontWeight: "bolder" }}
          >
            <Descriptions.Item label="ID">{order?.id}</Descriptions.Item>
            <Descriptions.Item label="Khu vực">
              {order?.room.area.name}
            </Descriptions.Item>
            <Descriptions.Item label="Bàn">
              {order?.room.name}
            </Descriptions.Item>
            <Descriptions.Item label="IsCanceled">
              {order?.canceled ? "True" : "False"}
            </Descriptions.Item>
            <Descriptions.Item label="Bắt đầu">
              {dayjs(order?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="Kết thúc">
              {dayjs(order?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            {/* <Descriptions.Item label="CreatedBy">{order?.createdBy}</Descriptions.Item>
            <Descriptions.Item label="UpdatedBy">{order?.updatedBy}</Descriptions.Item> */}
          </Descriptions>
        </Row>
        <Row justify={"space-between"}>
          <Table
            //@ts-ignore
            dataSource={orderDetails?.map((product) => ({
              ...product,
              key: product.id,
            }))}
            style={{ width: "100%" }}
            footer={footer}
          >
            <Table.Column title="ID" dataIndex={"id"} key={"id"} />
            <Table.Column
              title="Sản phẩm"
              dataIndex={["product", "name"]}
              key={"product.name"}
            />
            <Table.Column
              title="Giá"
              dataIndex={["product", "price"]}
              key={"product.price"}
            />
            <Table.Column
              title="Số lượng"
              dataIndex={"quantity"}
              key={"quantity"}
            />
            <Table.Column
              title="Danh mục"
              dataIndex={["product", "category", "name"]}
              key={"product.category.name"}
            />
            <Table.Column
              title="Đơn vị"
              dataIndex={["product", "unit", "name"]}
              key={"product.unit.name"}
            />
            <Table.Column
              title="Bắt đầu"
              dataIndex={"createdAt"}
              key={"createdAt"}
              render={(date: string) => (
                <>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</>
              )}
            />
            <Table.Column
              title="Kết thúc"
              dataIndex={"updatedAt"}
              key={"updatedAt"}
              render={(date: string) => (
                <>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</>
              )}
            />
            <Table.Column
              title="Tổng tiền"
              dataIndex={"Total"}
              key={"total"}
              render={(text: any, record: IOrderDetail) => {
                const total = record.quantity * record.product.price;
                return `${formatCurrency(total)}`;
              }}
            />
          </Table>
        </Row>
      </Modal>
    </Card>
  );
};
export default OrderController;

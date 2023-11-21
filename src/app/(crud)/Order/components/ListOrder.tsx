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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { IOrder, IOrderDetail } from "../interfaceOrder";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

interface IProps {
  onDelete: (orderId: number) => void;
  data: IOrder[];
  loading: boolean;
}

const OrderController: React.FC<IProps> = ({ onDelete, data, loading }) => {
  const [order, setOrder] = useState<IOrder>();

  const handleEdit = (record: IOrder) => {
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Bàn",
      dataIndex: ["room", "name"],
      key: "room.name",
    },
    {
      title: "Khu vực",
      dataIndex: ["room", "area", "name"],
      key: "room.area.name",
    },
    // {
    //   title: "User",
    //   dataIndex: ["user", "username"],
    //   key: "user.username",
    // },
    {
      title: "Bắt đầu",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</>
      ),
    },
    {
      title: "Kết thúc",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => (
        <>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</>
      ),
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
      dataIndex: "isCanceled",
      key: "isCanceled",
      render: (isCanceled: boolean) => <>{isCanceled ? "True" : "False"}</>,
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
    const totalCost = order?.orderDetails.reduce((acc, detail) => {
      return acc + detail.quantity * detail.product.price;
    }, 0);

    return (
      <div>
        <strong>Thành tiền:</strong> {totalCost?.toFixed(2)} VNĐ
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
          dataSource={data.map((order) => ({
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
              {order?.isCanceled ? "True" : "False"}
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
            dataSource={order?.orderDetails}
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
                return `${total.toFixed(2)} VND`;
              }}
            />
          </Table>
        </Row>
      </Modal>
    </Card>
  );
};
export default OrderController;

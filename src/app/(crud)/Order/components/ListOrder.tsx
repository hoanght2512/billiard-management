"use client";
import React, { useState } from "react";
import { Card, Space, Table, Modal, Button, Form, Row, Col, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IOrder, IOrderDetail } from "../interfaceOrder";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'

interface IProps {
  onDelete: (orderId: number) => void;
  data: IOrder[];
}

const OrderController: React.FC<IProps> = ({ onDelete, data }) => {
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
      title: "Room",
      dataIndex: ["room", "name"],
      key: "room.name",
    },
    {
      title: "Area",
      dataIndex: ["room", "area", "name"],
      key: "room.area.name",
    },
    // {
    //   title: "User",
    //   dataIndex: ["user", "username"],
    //   key: "user.username",
    // },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: ((date: string) => <>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</>)
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: ((date: string) => <>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</>)
    },
    {
      title: "CreatedBy",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "UpdatedBy",
      dataIndex: "updatedBy",
      key: "updatedBy",
    },
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
            <EyeOutlined /> View
          </a>
          <a onClick={() => handleDelete(record.id)}>
            <DeleteOutlined /> Delete
          </a>
        </Space>
      ),
    },
  ];

  console.log(order);

  return (
    <Card>
      <h1>List Order</h1>
      <Table
        pagination={{ defaultPageSize: 10 }}
        columns={columns}
        dataSource={data.map((order) => ({
          ...order,
          key: order.id,
        }))}
      />
      <Modal
        title="Order Detail"
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
        <Row justify={"space-around"}>
          <Col>
            <h4>Id: {order?.id}</h4>
            <h4>IsCanceled: {order?.isCanceled ? "True" : "False"}</h4>
          </Col>
          <Col>
            <h4>Ara: {order?.room.area.name}</h4>
            <h4>Room: {order?.room.name}</h4>
          </Col>
          <Col>
            <h4>Start Time: {dayjs(order?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</h4>
            <h4>End Time: {dayjs(order?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</h4>
          </Col>
          <Col>
            <h4>CreatedBy: {order?.createdBy}</h4>
            <h4>UpdatedBy: {order?.updatedBy}</h4>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col span={24}>
            <Card>
              <table style={{ fontSize: "15px", width: "100%" }}>
                <thead>
                  {/* <td width={30}>Id</td> */}
                  <td width={30}>STT</td>
                  <td>Product</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Category</td>
                  <td>Unit</td>
                  <td>Total Price</td>
                  <td>Create At</td>
                  <td>Update At</td>
                  <td>Start Time</td>
                </thead>
                {order?.orderDetails.map((orderDetail, index) => (
                  <>
                    <tr key={orderDetail.id}>
                      {/* <td>{orderDetail?.id}</td> */}
                      <td>{index + 1}</td>
                      <td>{orderDetail?.product.name}</td>
                      <td>{orderDetail?.product.price}</td>
                      <td>{orderDetail?.quantity}</td>
                      <td>{orderDetail?.product.category.name}</td>
                      <td>{orderDetail?.product.unit.name}</td>
                      <td>
                        {orderDetail?.quantity * orderDetail?.product.price}
                      </td>
                      <td>{dayjs(orderDetail?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                      <td>{dayjs(orderDetail?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                      <td>{dayjs(orderDetail?.startTime).format('YYYY-MM-DD HH:mm:ss')}</td>
                    </tr>
                  </>
                ))}
              </table>
            </Card>
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};
export default OrderController;

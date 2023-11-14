"use client";
import React from "react";
import { Card, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ICustomer } from "@/lib/interfaceBase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface IProps {
  onEdit: (customer: ICustomer) => void;
  onDelete: (customerId: number) => void;
  data: ICustomer[];
}

const CustomerController: React.FC<IProps> = ({ onEdit, onDelete, data }) => {
  const handleEdit = (record: ICustomer) => {
    onEdit(record);
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
  const columns: ColumnsType<ICustomer> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <EditOutlined /> Edit
          </a>
          <a onClick={() => handleDelete(record.id)}>
            <DeleteOutlined /> Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table
        pagination={{ defaultPageSize: 5 }}
        columns={columns}
        dataSource={data.map((customer) => ({
          ...customer,
          key: customer.id,
        }))}
      />
    </Card>
  );
};
export default CustomerController;

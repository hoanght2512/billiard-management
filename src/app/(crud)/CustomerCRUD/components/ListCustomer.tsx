"use client";
import React from "react";
import { Button, Card, Input, Modal, Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ICustomer } from "@/lib/interfaceBase";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { text } from "stream/consumers";

interface IProps {
  onEdit: (customer: ICustomer) => void;
  onDelete: (customerId: number) => void;
  data: ICustomer[];
  loading: boolean;
}

const CustomerController: React.FC<IProps> = ({
  onEdit,
  onDelete,
  data,
  loading,
}) => {
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
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render:(text) => <>{text}%</>,
      sorter: (a, b) => a.discount - b.discount,
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
  const pageSizeOptions = ["5", "10", "20"];
  return (
    <Card>
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
          scroll={{ x: 600 }}
          //@ts-ignore
          dataSource={data?.content?.map((customer) => ({
            ...customer,
            key: customer.id,
          }))}
        />
      </Spin>
    </Card>
  );
};
export default CustomerController;

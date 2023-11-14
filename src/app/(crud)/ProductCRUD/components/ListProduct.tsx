"use client";
import React from "react";
import { Card, Image, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct } from "@/lib/interfaceBase";
import Paragraph from "antd/es/typography/Paragraph";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface IProps {
  onEdit: (product: IProduct) => void;
  onDelete: (productId: number) => void;
  data: IProduct[];
}

const ProductController: React.FC<IProps> = ({ onEdit, onDelete, data }) => {
  const handleEdit = (record: IProduct) => {
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
  const columns: ColumnsType<IProduct> = [
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
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <Image width={80} src={record.image} />,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
          {record.image}
        </Paragraph>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category.name",
    },
    {
      title: "Unit",
      dataIndex: ["unit", "name"],
      key: "unit.name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}><EditOutlined/> Edit</a>
          <a onClick={() => handleDelete(record.id)}><DeleteOutlined /> Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table
        pagination={{defaultPageSize:5}}
        columns={columns}
        dataSource={data.map((product) => ({
          ...product,
          key: product.id,
        }))}
      />
    </Card>
  );
};

export default ProductController;

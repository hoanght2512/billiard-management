"use client";
import React, { useEffect, useState } from "react";
import { Card, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct } from "./interface";

interface IProps {
  onEdit: (product: IProduct) => void;
  onDelete: (productId: number) => void;
  data: IProduct[];
}

const ProductController: React.FC<IProps> = (props) => {
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
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: ["productCategory", "name"],
      key: "productCategory.name",
    },
    {
      title: "Unit",
      dataIndex: ["productUnit", "name"],
      key: "unit.name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              e.preventDefault();
              props.onEdit(record);
            }}
          >
            Edit
          </a>
          <a onClick={() => props.onDelete(record.id)}> Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table columns={columns} dataSource={props.data} />
    </Card>
  );
};
export default ProductController;

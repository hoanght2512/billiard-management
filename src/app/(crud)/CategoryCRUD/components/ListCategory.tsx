"use client";
import React from "react";
import { Card, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ICategory } from "@/lib/interfaceBase";

interface IProps {
  onEdit: (category: ICategory) => void;
  onDelete: (categoryId: number) => void;
  data: ICategory[];
}

const CategoryController: React.FC<IProps> = ({ onEdit, onDelete, data }) => {
  const handleEdit = (record: ICategory) => {
    onEdit(record);
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };
  const columns: ColumnsType<ICategory> = [
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table
        columns={columns}
        dataSource={data.map((category) => ({
          ...category,
          key: category.id,
        }))}
      />
    </Card>
  );
};
export default CategoryController;

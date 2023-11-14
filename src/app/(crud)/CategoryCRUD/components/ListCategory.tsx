"use client";
import React from "react";
import { Card, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
  const columns: ColumnsType<ICategory> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
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
        dataSource={data.map((category) => ({
          ...category,
          key: category.id,
        }))}
      />
    </Card>
  );
};
export default CategoryController;

"use client";
import React from "react";
import { Card, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IArea } from "@/lib/interfaceBase";

interface IProps {
  onEdit: (area: IArea) => void;
  onDelete: (areaId: number) => void;
  data: IArea[];
}

const AreaController: React.FC<IProps> = ({ onEdit, onDelete, data }) => {
  const handleEdit = (record: IArea) => {
    onEdit(record);
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const columns: ColumnsType<IArea> = [
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
        dataSource={data.map((area) => ({ ...area, key: area.id }))}
      />
    </Card>
  );
};
export default AreaController;

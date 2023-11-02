"use client";
import React from "react";
import { Card, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IRoom } from "@/lib/interfaceBase";
interface IProps {
  onEdit: (room: IRoom) => void;
  onDelete: (roomId: number) => void;
  data: IRoom[];
}
const RoomController: React.FC<IProps> = ({ onEdit, onDelete, data }) => {
  const handleEdit = (record: IRoom) => {
    onEdit(record);
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };
  const columns: ColumnsType<IRoom> = [
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
      title: "Area",
      dataIndex: ["area", "name"],
      key: "area.name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Mở" : "Đóng"),
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
        dataSource={data.map((room) => ({ ...room, key: room.id }))}
      />
    </Card>
  );
};
export default RoomController;

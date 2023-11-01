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
const RoomController: React.FC<IProps> = (props) => {
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
export default RoomController;

"use client";
import React from "react";
import { Card, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IRoom } from "@/lib/interfaceBase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
  const columns: ColumnsType<IRoom> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên bàn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khu vực",
      dataIndex: ["area", "name"],
      key: "area.name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status : boolean) => <>{status ? "Mở" : "Đóng"}</>
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
        dataSource={data.map((room) => ({ ...room, key: room.id }))}
      />
    </Card>
  );
};
export default RoomController;

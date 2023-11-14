"use client";
import React from "react";
import { Card, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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

  const columns: ColumnsType<IArea> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên khu vực",
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
        dataSource={data.map((area) => ({ ...area, key: area.id }))}
      />
    </Card>
  );
};
export default AreaController;

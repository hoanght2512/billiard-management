"use client";
import React from "react";
import { Card, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IUnit } from "@/lib/interfaceBase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface IProps {
  onEdit: (unit: IUnit) => void;
  onDelete: (areaId: number) => void;
  data: IUnit[];
}
const UnitController: React.FC<IProps> = ({ onEdit, onDelete, data }) => {
  const handleEdit = (record: IUnit) => {
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
  const columns: ColumnsType<IUnit> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên đơn vị",
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
        dataSource={data.map((unit) => ({ ...unit, key: unit.id }))}
      />
    </Card>
  );
};

export default UnitController;

"use client";
import React from "react";
import { Card, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IUnit } from "@/lib/interfaceBase";

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
    onDelete(id);
  };
  const columns: ColumnsType<IUnit> = [
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
        dataSource={data.map((unit) => ({ ...unit, key: unit.id }))}
      />
    </Card>
  );
};

export default UnitController;

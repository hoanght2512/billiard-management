"use client";
import React from "react";
import { Card, Modal, Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IArea } from "@/lib/interfaceBase";

interface IProps {
  onEdit: (area: IArea) => void;
  onDelete: (areaId: number) => void;
  data: IArea[];
  loading: boolean
}

const AreaController: React.FC<IProps> = ({ onEdit, onDelete, data, loading }) => {
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

  const pageSizeOptions = ["5", "10", "20"];
  return (
    <Card>
      <Spin spinning={loading} tip="Loading..." size="large">
      <Table
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: pageSizeOptions,
          defaultPageSize: Number(pageSizeOptions[0]),
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          showLessItems: true, // Ẩn bớt nút trang khi có nhiều trang
        }}
        columns={columns}
        scroll={{ x: 600 }}
        //@ts-ignore
        dataSource={data?.content?.map((area) => ({ ...area, key: area.id }))}
      />
      </Spin>
    </Card>
  );
};
export default AreaController;

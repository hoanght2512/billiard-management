"use client";
import React from "react";
import { Card, Modal, Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IRoom } from "@/lib/interfaceBase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
interface IProps {
  onEdit: (room: IRoom) => void;
  onDelete: (roomId: number) => void;
  data: IRoom[];
  loading: boolean
}
const RoomController: React.FC<IProps> = ({ onEdit, onDelete, data, loading }) => {
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
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên bàn",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Khu vực",
      dataIndex: "areaName",
      key: "areaName",
      //@ts-ignore
      sorter: (a, b) => a.areaName.length - b.areaName.length,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status : boolean) => <>{status ? "Mở" : "Đóng"}</>,
      sorter: (a, b) => Number(a.status) - Number(b.status),
      filters: [{text: "Mở", value : true}, {text: "Đóng", value: false}],
       //@ts-ignore
      onFilter: (value: boolean , record) => record.status === value,
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
        dataSource={data?.content?.map((room) => ({ ...room, key: room.id }))}
      />
      </Spin>
    </Card>
  );
};
export default RoomController;

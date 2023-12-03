"use client";
import React from "react";
import { Card, Modal, Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IUser } from "@/lib/interfaceBase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface IProps {
  onEdit: (user: IUser) => void;
  onDelete: (userId: number) => void;
  data: IUser[];
  loading: boolean;
}

const UserController: React.FC<IProps> = ({
  onEdit,
  onDelete,
  data,
  loading,
}) => {
  const handleEdit = (record: IUser) => {
    onEdit(record);
  };

  const handleDelete = (id: any) => {
    console.log(id)
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
  const columns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => {
        if(a.email === null || b.email === null){
          return a.email === null ? 1 : -1;
        }
        return a.email.length - b.email.length
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      sorter: (a, b) => a.fullname.length - b.fullname.length,
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => (
        <div style={{ width: "90px" }}>
          {
            //@ts-ignore
            roles?.map((role) => (
              <p key={role.name}>{role.name}</p>
            ))
          }
        </div>
      ),
      sorter: (a, b) => a.roles.length - b.roles.length
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <EditOutlined /> Edit
          </a>
          <a onClick={() => handleDelete(record.id)}>
            <DeleteOutlined /> Delete
          </a>
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
          dataSource={data?.content?.map((user) => ({
            ...user,
            key: user?.id,
          }))}
        />
      </Spin>
    </Card>
  );
};
export default UserController;

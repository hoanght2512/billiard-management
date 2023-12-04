"use client";
import React, { useRef, useState } from "react";
import { Button, Card, Input, InputRef, Modal, Space, Spin, Table, Tag } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { IUser } from "@/lib/interfaceBase";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

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
    console.log(id);
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

  type DataIndex = keyof IUser;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IUser> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.length - b.username.length,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => {
        if (a.email === null || b.email === null) {
          return a.email === null ? 1 : -1;
        }
        return a.email.length - b.email.length;
      },
      ...getColumnSearchProps("email"),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      sorter: (a, b) => a.fullname.length - b.fullname.length,
      ...getColumnSearchProps("fullname"),
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
      sorter: (a, b) => a.roles.length - b.roles.length,
      filters: [
        { text: "ROLE_ADMIN", value: "ROLE_ADMIN" },
        { text: "ROLE_USER", value: "ROLE_USER" },
      ],
      onFilter: (value, record) =>
        record.roles.some((role) => role.name === value),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tag color="#2db7f5">
            <a onClick={() => handleEdit(record)}>
              <EditOutlined />
              Edit
            </a>
          </Tag>
          <Tag color="#f50">
            <a onClick={() => handleDelete(record.id)}>
              <DeleteOutlined />
              Delete
            </a>
          </Tag>
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

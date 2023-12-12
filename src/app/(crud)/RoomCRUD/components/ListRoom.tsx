"use client";
import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Image,
  Input,
  InputRef,
  List,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { IRoom } from "@/lib/interfaceBase";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
const { Text } = Typography;

interface IProps {
  onEdit: (room: IRoom) => void;
  onDelete: (roomId: number) => void;
  data: IRoom[];
  loading: boolean;
}
const RoomController: React.FC<IProps> = ({
  onEdit,
  onDelete,
  data,
  loading,
}) => {
  // const roomsWithProducts = data?.content?.filter((room) => room.roomProducts?.length > 0) || [];
  // const roomsWithoutProducts = data?.content?.filter((room) => !room.roomProducts || room.roomProducts.length === 0) || [];
// console.log(roomsWithoutProducts)
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

  type DataIndex = keyof IRoom;

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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IRoom> => ({
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

  const columns: ColumnsType<IRoom> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Tên bàn",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Khu vực",
      dataIndex: "areaName",
      key: "areaName",
      //@ts-ignore
      sorter: (a, b) => a.areaName.length - b.areaName.length,
      //@ts-ignore
      ...getColumnSearchProps("areaName"),
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (
        <Tag color={active ? "green" : "red"}>{active ? "Mở" : "Đóng"}</Tag>
      ),
      sorter: (a, b) => Number(a.active) - Number(b.active),
      filters: [
        { text: "Mở", value: true },
        { text: "Đóng", value: false },
      ],
      onFilter: (value, record) => record.active === value,
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
    <>
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
            dataSource={data?.content?.map((room) => ({
              ...room,
              key: room.id,
            }))}
          />
        </Spin>
      </Card>
      {/* <Card style={{ marginTop: "20px" }}>
        <Text>Danh sách BÀN có sản phẩm mặc định</Text>
        <List
          style={{ marginTop: "20px" }}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }} // Adjust the grid settings
          dataSource={roomsWithProducts.map((room) => ({
            ...room,
            key: room.id,
          }))}
          renderItem={(item) => {
            //@ts-ignore
            const { name, id, roomOrders } = item;
            // const active = roomOrders.length > 0;
            const isUsed = roomOrders && roomOrders.length;
            return (
              <List.Item>
                <a>
                  <Card
                    size="small"
                    hoverable
                    cover={
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fdining-room%20(3).png?alt=media&token=116a175e-7315-41ac-ab29-98b477fbc032"
                        alt="product"
                        style={{ width: "68px" }}
                        preview={false}
                      />
                    }
                    style={{
                      // width: "100px",
                      textAlign: "center",
                      minHeight: "90px",
                      // border:
                      //   selectedRoom === id
                      //     ? "1px solid red"
                      //     : "1px solid #e8e8e8",
                      backgroundColor: isUsed ? "#307DC7" : "",
                    }}
                  >
                    <Text strong style={{ color: isUsed ? "white" : "" }}>
                      {name}
                    </Text>
                    <br />
                    <Text
                      type="secondary"
                      style={{ color: isUsed ? "white" : "" }}
                    >
                      {isUsed ? "Đang sử dụng" : "Trống"}
                    </Text>
                  </Card>
                </a>
              </List.Item>
            );
          }}
        />
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <Text>Danh sách BÀN không có sản phẩm mặc định</Text>
        <List
          style={{ marginTop: "20px" }}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
          dataSource={roomsWithoutProducts.map((room) => ({
            ...room,
            key: room.id,
          }))}
          renderItem={(item) => {
            //@ts-ignore
            const { name, id, roomOrders } = item;
            // const active = roomOrders.length > 0;
            const isUsed = roomOrders && roomOrders.length;
            return (
              <List.Item>
                <a>
                  <Card
                    size="small"
                    hoverable
                    cover={
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fdining-room%20(3).png?alt=media&token=116a175e-7315-41ac-ab29-98b477fbc032"
                        alt="product"
                        style={{ width: "68px" }}
                        preview={false}
                      />
                    }
                    style={{
                      // width: "100px",
                      textAlign: "center",
                      minHeight: "90px",
                      // border:
                      //   selectedRoom === id
                      //     ? "1px solid red"
                      //     : "1px solid #e8e8e8",
                      backgroundColor: isUsed ? "#307DC7" : "",
                    }}
                  >
                    <Text strong style={{ color: isUsed ? "white" : "" }}>
                      {name}
                    </Text>
                    <br />
                    <Text
                      type="secondary"
                      style={{ color: isUsed ? "white" : "" }}
                    >
                      {isUsed ? "Đang sử dụng" : "Trống"}
                    </Text>
                  </Card>
                </a>
              </List.Item>
            );          }}
        />
      </Card>
      <Button >Thêm sản phẩm mặc định</Button> */}
    </>
  );
};
export default RoomController;

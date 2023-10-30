"use client";
import React, { useEffect, useState } from "react";
import { Card, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteRoom, findAll } from "@/app/services/roomService";
import { IRoom, DataTypeRoom } from "./interface";
interface IProps {
  onEdit: (room: IRoom) => void;
}
const RoomController: React.FunctionComponent<IProps> = (props) => {
  const getEditId = (record: DataTypeRoom) => {
    return record.id;
  };
  const handleDelete = async (deleteId: any) => {
    message.success("Xóa thành công!");
    await deleteRoom(deleteId);
  };

  const columns: ColumnsType<DataTypeRoom> = [
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
      title: "Area_name",
      dataIndex: "area",
      key: "area.name",
      render: (area) => {
        return area.name;
      },
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
          <a
            onClick={() => {
              handleDelete(getEditId(record));
            }}
          >
            {" "}
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const App = () => {
    const [data, setData] = useState<DataTypeRoom[]>([]);
    useEffect(() => {
      fetchData();
    }, [data]);

    const fetchData = async () => {
      const response = await findAll();
      //@ts-ignore
      setData(response);
    };
    return (
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    );
  };
  return <App />;
};
export default RoomController;

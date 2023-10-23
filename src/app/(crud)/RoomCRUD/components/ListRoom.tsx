"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteRoom, findAll } from "@/app/services/roomService";
import { IRoom } from "./interface";
interface IProps {
  onEdit: (room: IRoom) => void;
}
const RoomController: React.FunctionComponent<IProps> = (props) => {
  const getEditId = (record: DataType) => {
    return record.id;
  };
  const handleDelete = async (deleteId: any) => {
    message.success("Xóa thành công!");
    await deleteRoom(deleteId);
  };
  interface DataType {
    id: string;
    name: string;
    area: {
      id: number | string;
      name: string;
    };
  }

  const columns: ColumnsType<DataType> = [
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
    const [data, setData] = useState<DataType[]>([]);
    useEffect(() => {
      fetchData();
    }, [data]);

    const fetchData = async () => {
      const response = await findAll();
      // Tui debug object in object ( RIN )
      //   console.log(response?.[0].area.name)
      //@ts-ignore
      setData(response);
    };
    return <Table columns={columns} dataSource={data} />;
  };
  return <App />;
};
export default RoomController;

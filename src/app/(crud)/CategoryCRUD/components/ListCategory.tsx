"use client";
import React, { useEffect, useState } from "react";
import { Card, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteCategory, findAll } from "@/app/services/categoryService";
import { ICategory } from "./interface";

interface IProps {
  onEdit: (category: ICategory) => void;
}

const CategoryController: React.FunctionComponent<IProps> = (props) => {
  const getEditId = (record: DataType) => {
    return record.id;
  };

  const handleDelete = async (deleteId: any) => {
    message.success("Xóa thành công!");
    await deleteCategory(deleteId);
  };
  
  interface DataType {
    id: string;
    name: string;
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
      //@ts-ignore
      setData(response);
      // console.log(response)
    };
    return <Card><Table columns={columns} dataSource={data} /></Card>;
  };
  return <App />;
};
export default CategoryController;

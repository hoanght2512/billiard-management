"use client";
import React, { useEffect, useState } from "react";
import { Card, Image, Space, Table, Typography, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteProduct, findAll } from "@/app/services/productService";
import { IProduct, DataTypeProduct } from "./interface";
interface IProps {
  onEdit: (product: IProduct) => void;
}
const { Paragraph, Text } = Typography;

const ProductController: React.FunctionComponent<IProps> = (props) => {
  const getEditId = (record: DataTypeProduct) => {
    return record.id;
  };
  const handleDelete = async (deleteId: any) => {
    message.success("Xóa thành công!");
    await deleteProduct(deleteId);
  };

  const columns: ColumnsType<DataTypeProduct> = [
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
      render: (_, record) => (
        <Paragraph ellipsis={{ rows: 1, expandable: true, symbol: "more" }}>
          {record.name}
        </Paragraph>
      ),
    },
    {
      title: "Url",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
          {record.image}
        </Paragraph>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Image width={80} src={record.image}/>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category.name",
      render: (category) => {
        //@ts-ignore
        return category?.name;
      },
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit.name",
      render: (unit) => {
        //@ts-ignore
        return unit?.name;
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
    const [data, setData] = useState<DataTypeProduct[]>([]);
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
export default ProductController;

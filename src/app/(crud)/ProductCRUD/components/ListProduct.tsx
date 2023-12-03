"use client";
import React from "react";
import { Card, Image, Modal, Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct } from "@/lib/interfaceBase";
import Paragraph from "antd/es/typography/Paragraph";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { text } from "stream/consumers";

interface IProps {
  onEdit: (product: IProduct) => void;
  onDelete: (productId: number) => void;
  data: IProduct[];
  loading: boolean
}

const ProductController: React.FC<IProps> = ({ onEdit, onDelete, data, loading }) => {
  const handleEdit = (record: IProduct) => {
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

  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== "number") {
      return "N/A";
    }
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <Image width={80} src={record.image} alt="image"/>,
    },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (_, record) => (
    //     <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
    //       {record.image}
    //     </Paragraph>
    //   ),
    // },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      //@ts-ignore
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
    },
    {
      title: "Unit",
      dataIndex: "unitName",
      key: "unitName",
      //@ts-ignore
      sorter: (a, b) => a.unitName.length - b.unitName.length,
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
        dataSource={data?.content?.map((product) => ({
          ...product,
          key: product.id,
        }))}
      />
      </Spin>
    </Card>
  );
};

export default ProductController;

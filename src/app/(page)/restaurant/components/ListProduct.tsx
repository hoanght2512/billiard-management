"use client";
import { findAll } from "@/app/services/productService";
import { axiosClient } from "@/lib/http/axios-client";
import { Card, Image, List, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";

const { Text } = Typography;
const { Meta } = Card;

const formatCurrency = (value: number) => {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

// const data = [
//   {
//     title: 'Sản phẩm 1111111111111111',
//     price: 10000,
//   },
//   {
//     title: 'Sản phẩm 2',
//     price: 10000,
//   },
//   {
//     title: 'Sản phẩm 3',
//     price: 10000,
//   },
//   {
//     title: 'Sản phẩm 4',
//     price: 10000,
//   },
//   {
//     title: 'Sản phẩm 5',
//     price: 10000,
//   },
//   {
//     title: 'Sản phẩm 6',
//     price: 10000,
//   },
// ]

const ListProduct = () => {
  const [data, setData] = useState<[]>([]);

  const listData = async () => {
    const response = await findAll();
    //@ts-ignore
    setData(response);
  };
  useEffect(() => {
    listData();
  }, []);

  return (
    <List
      grid={{ gutter: 5, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 3 }}
      style={{ padding: "10px", minHeight: "90vh" }}
      dataSource={data}
      renderItem={(item) => {
        const { name } = item;
        //@ts-ignore
        const price = item.price;
        //@ts-ignore
        const image = item.image;

        return (
          <List.Item>
            <Card
              size="small"
              hoverable
              cover={<Image src={image} alt="product" preview={false} />}
            >
              <Tag
                color="#f50"
                style={{
                  position: "absolute",
                  right: "-5px",
                  top: "2px",
                }}
              >
                {formatCurrency(price)}
              </Tag>
              <Text
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </Text>
            </Card>
          </List.Item>
        );
      }}
    />
  );
};

export default ListProduct;

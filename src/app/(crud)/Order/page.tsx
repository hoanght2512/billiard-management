"use client";
import React, { useEffect, useState } from "react";
import { Col, Flex, Row, message } from "antd";
import OrderController from "./components/ListOrder";
import {
  deleteOrder,
  findAllOrder,
} from "@/app/services/orderService";
import { IOrder } from "./interfaceOrder";

const AppOrderCTRL: React.FC = () => {
  const [data, setData] = useState<IOrder[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await findAllOrder();
    //@ts-ignore
    setData(response);
  };

  const onDelete = async (orderId: number) => {
    const res = await deleteOrder(orderId);
    if (res) {
      message.success("Xóa thành công!");
      fetchData();
    }
  };
  return (
    <>
      <Row justify={"center"} >
        <Col span={22}>
          <OrderController
            data={data}
            onDelete={onDelete}
          />
        </Col>
      </Row>
    </>
  );
};

export default AppOrderCTRL;

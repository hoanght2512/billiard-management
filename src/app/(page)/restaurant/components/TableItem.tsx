"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  InputNumber,
  Space,
  Table,
  Tag,
  TimePicker,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  AppstoreOutlined,
  DeleteFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { IRoom, IRoomOrder, RoomOrderDetail } from "@/lib/interfaceBase";
import { SearchProps } from "antd/es/input";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

import Search from "antd/es/input/Search";

const { Text } = Typography;
interface IProps {
  roomOrder?: IRoomOrder[];
  room: IRoom | undefined;
  onUpdate: (roomOrderId: any, roomOrderDetail: RoomOrderDetail) => void;
  onDelete: (roomOrderId: number) => void;
  onUpdateTotal: (total: number) => void;
}
const TableItem: React.FC<IProps> = ({
  roomOrder,
  room,
  onUpdate,
  onDelete,
  onUpdateTotal,
}) => {
  dayjs.extend(customParseFormat);

  console.log(roomOrder);
  const handleDelete = (roomOrderId: number) => () => {
    onDelete(roomOrderId);
  };
  const handleQuantityChange = (
    roomOrderId: number,
    newQuantity: RoomOrderDetail
  ) => {
    const serializableQuantity = {
      room: {
        id: newQuantity?.room?.id,
      },
      product: {
        id: newQuantity?.product?.id,
      },
      quantity: newQuantity,
    };
    const jsonString = serializableQuantity;
    //@ts-ignore
    onUpdate(roomOrderId, jsonString);
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
  useEffect(() => {
    const sum =
      roomOrder?.reduce((acc, record) => {
        const { quantity, product } = record;
        const { price } = product || {};
        if (quantity && price) {
          return acc + quantity * price;
        }
        return acc;
      }, 0) || 0;
    if (onUpdateTotal) {
      onUpdateTotal(sum);
    }
  }, [roomOrder, onUpdateTotal]);
  const columns: ColumnsType<IRoomOrder> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <>
          {record.product?.hourly && (
            <>
              <Tag color="#f50">
                <FontAwesomeIcon icon={faClock} />
              </Tag>
            </>
          )}
          <Text strong>{record.product?.name} </Text>
          {record.product?.hourly && (
            <TimePicker
              defaultValue={dayjs(record.created_at)}
              format="HH:mm"
            />
          )}
        </>
      ),
    },
    {
      title: "Đơn vị",
      dataIndex: ["product", "unit"],
      key: "product.unit.name",
      width: "10%",
      render: (unit) => <Tag color="#f50">{unit?.name}</Tag>,
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
      render(value, record, index) {
        const hourly = record.product.hourly;
        //@ts-ignore
        const name = record.product?.unit?.name;
        const step = name === "Tiền giờ" ? 0.1 : 1;
        const min = name === "Tiền giờ" ? 0.1 : 1;
        return (
          <InputNumber
            min={min}
            step={step}
            defaultValue={value}
            value={record.quantity}
            disabled={name === "Tiền giờ" ? index === 0 : false}
            onChange={(newValue) => handleQuantityChange(record.id, newValue)}
          />
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: ["product", "price"],
      key: "price",
      width: "10%",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "10%",
      render: (_, record) => {
        const { quantity } = record;
        const { price } = record.product;
        const total = quantity * price || 0;

        return formatCurrency(total);
      },
    },
    {
      title: "",
      key: "key",
      width: "5%",
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteFilled />}
          onClick={handleDelete(record.id)}
        />
      ),
    },
  ];
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <div
      style={{
        minHeight: "75vh",
        maxHeight: "83vh",
        overflowY: "scroll",
        backgroundColor: "#fff",
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
        // padding: "10px"
      }}
    >
      <Space style={{ margin: "10px" }}>
        <Tag color="blue" style={{ borderRadius: "24px", padding: "5px" }}>
          {room?.name} - {room?.area.name}
        </Tag>
        <Search
          placeholder="Tìm khách hàng"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </Space>

      <Table
        size="small"
        pagination={false}
        columns={columns}
        //@ts-ignore
        dataSource={roomOrder}
        //        dataSource={data.map((room) => ({ ...room, key: room.id }))}
        style={{ padding: "0 auto " }}
      />
    </div>
  );
};

export default TableItem;

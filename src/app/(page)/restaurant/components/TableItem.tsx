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
  const [realTime, setRealTime] = useState(dayjs()); // Thời gian thực tế
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTime(dayjs());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  // console.log(roomOrder);
  const startRoom = () => {
  }
  const handleDelete = (roomOrderId: number) => () => {
    onDelete(roomOrderId);
  };
  const handleQuantityChange = (
    roomOrderId: any,
    newQuantity: any
  ) => {
    const serializableQuantity = {
      roomId: roomOrderId?.roomId,
      productId: roomOrderId?.productId,
      quantity: newQuantity,
      //@ts-ignore
      orderTime: dayjs(roomOrderId?.orderTime).format("YYYY-MM-DD HH:mm:ss")
      
    };
    const jsonString = serializableQuantity;
    console.log(jsonString)
    //@ts-ignore
    onUpdate(roomOrderId?.id, jsonString);
    console.log(newQuantity)
    console.log(roomOrderId)
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
      roomOrder?.reduce((acc, record) => {//@ts-ignore
        const { quantity, productPrice } = record;
        // const { price } = product || {};
        if (quantity && productPrice) {
          return acc + quantity * productPrice;
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
          {//@ts-ignore
          record.productHourly && (
            <>
              <Tag color="#f50">
                <FontAwesomeIcon icon={faClock} />
              </Tag>
            </>
          )}
          <Text strong>{//@ts-ignore
          record.productName} </Text>
          {//@ts-ignore
          record.productHourly && (
            // <Tag color="blue" style={{ borderRadius: "24px" }}>
            <>
              <Text style={{ marginLeft: "20px" }}>Từ</Text>
              <TimePicker
                bordered={false}
                // value={dayjs(record.created_at).add(realTime.diff(dayjs()), 'ms')}
                suffixIcon={false}
                defaultValue=//@ts-ignore
                {dayjs(record.createdAt)}
                format="HH:mm:ss"
              />
            </>
            //  </Tag>
          )}
          {/* <TimePicker
              value={dayjs(record.created_at).add(realTime.diff(dayjs()), 'ms')}
              format="HH:mm:ss"
            /> */}
        </>
      ),
    },
    {
      title: "Đơn vị",
      dataIndex: "productUnitName",
      key: "productUnitName",
      width: "10%",
      render: (unit) => <Tag color="#f50">{unit}</Tag>,
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
      render(value, record, index) {
        // const hourly = record.productHourly;
        //@ts-ignore
        const name = record.productUnitName;
        const step = name === "Tiền giờ" ? 0.1 : 1;
        const min = name === "Tiền giờ" ? 0.1 : 1;
        return (
          <InputNumber
            min={min}
            step={step}
            defaultValue={value}
            value={record.quantity}
            disabled={name === "Tiền giờ" ? index === 0 : false}
            onChange={(newValue) => handleQuantityChange(record, newValue)}
          />
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "productPrice",
      key: "productPrice",
      width: "10%",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "10%",
      render: (_, record) => {
        //@ts-ignore
        const { quantity, productPrice } = record;
        const total = quantity * productPrice || 0;

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
          {room?.name} - {//@ts-ignore
          room?.areaName}
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

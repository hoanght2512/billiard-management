"use client";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  InputNumber,
  Popconfirm,
  Row,
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
import "@/lib/assets/styles/buttonTableItem.css";
import Search from "antd/es/input/Search";
import TextArea from "antd/es/input/TextArea";

const { Text } = Typography;
interface IProps {
  // roomOrder?: IRoomOrder[];
  room: IRoom | undefined;
  onUpdate: (roomOrderDetail: RoomOrderDetail) => void;
  onDelete: (roomOrderId: number) => void;
  onUpdateTotal: (total: number) => void;
}
const TableItem: React.FC<IProps> = ({
  // roomOrder,
  room,
  onUpdate,
  onDelete,
  onUpdateTotal,
}) => {
  dayjs.extend(customParseFormat);
  const [remainingQuantity, setRemainingQuantity] = useState<number | null>(
    null
  );
  const [additionalContentVisible, setAdditionalContentVisible] = useState(false);

  const [realTime, setRealTime] = useState(dayjs()); // Thời gian thực tế
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTime(dayjs());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  // console.log(roomOrder);
  const startRoom = () => {};

  const handleDelete = (roomOrderId: number) => () => {
    onDelete(roomOrderId);
  };
  const handleQuantityChange = (roomOrderId: any, newQuantity: any) => {
    const currentQuantity = roomOrderId.quantity || 0;
    const diff = newQuantity - currentQuantity;

    // Calculate remaining quantity
    const remaining = Math.max(currentQuantity - diff, 0);
    setRemainingQuantity(remaining);

    // Update the quantity
    const serializableQuantity = {
      roomId: roomOrderId?.roomId,
      productId: roomOrderId?.productId,
      quantity: newQuantity,
      orderTime: dayjs(roomOrderId?.orderTime).format("YYYY-MM-DD HH:mm:ss"),
    };
    const jsonString = serializableQuantity;
    onUpdate(jsonString);

    setAdditionalContentVisible(true);
  };
  // const newQuantityDl = () => {

  // }
  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== "number") {
      return "N/A";
    }
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  // useEffect(() => {
  //   const sum =
  //     roomOrder?.reduce((acc, record) => {//@ts-ignore
  //       const { quantity, productPrice } = record;
  //       // const { price } = product || {};
  //       if (quantity && productPrice) {
  //         return acc + quantity * productPrice;
  //       }
  //       return acc;
  //     }, 0) || 0;
  //   if (onUpdateTotal) {
  //     onUpdateTotal(sum);
  //   }
  // }, [roomOrder, onUpdateTotal]);
  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });
  // const onChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   console.log("Change:", e.target.value);
  // };
  const columns: ColumnsType<IRoomOrder> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <>
          {
            //@ts-ignore
            record.productHourly && (
              <>
                <Tag color="#f50">
                  <FontAwesomeIcon icon={faClock} />
                </Tag>
              </>
            )
          }
          <Text strong>
            {
              //@ts-ignore
              record.productName
            }{" "}
          </Text>
          {
            //@ts-ignore
            record.productHourly && (
              // <Tag color="blue" style={{ borderRadius: "24px" }}>
              <>
                <Text style={{ marginLeft: "20px" }}>Từ</Text>
                <TimePicker
                  bordered={false}
                  // value={dayjs(record.created_at).add(realTime.diff(dayjs()), 'ms')}
                  suffixIcon={false}
                  defaultValue={dayjs(
                    //@ts-ignore
                    record.createdAt
                  )}
                  format="HH:mm:ss"
                />
              </>
              //  </Tag>
            )
          }
          {/* <TimePicker
              value={dayjs(record.created_at).add(realTime.diff(dayjs()), 'ms')}
              format="HH:mm:ss"
            /> */}
        </>
      ),
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
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
        <Popconfirm
          title="Hủy/Trả đồ "
          description={
            <>
              <div className="wrapper">
                <span
                  className="minus"
                  onClick={() =>
                    handleQuantityChange(record, record.quantity - 1)
                  }
                >
                  -
                </span>
                <span className="num">{record.quantity}</span>
                <span
                  className="plus"
                  onClick={() =>
                    handleQuantityChange(record, record.quantity + 1)
                  }
                >
                  +
                </span>
              </div>
              {additionalContentVisible && (
                <Row
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "15px",
                  }}
                >
                  {" "}
                  <Col flex={1}>
                    {" "}
                    <Typography>Số lượng còn lại: </Typography>
                  </Col>
                  <Col>
                    {" "}
                    <Tag color="#f50" style={{ fontSize: "20px" }}>
                      {remainingQuantity !== null ? remainingQuantity : "..."}
                    </Tag>
                  </Col>
                  <TextArea
                    showCount
                    maxLength={100}
                    placeholder="disable resize"
                    style={{ height: 120, resize: "none", marginTop: "15px" }}
                  />
                </Row>
              )}
            </>
          }
          onConfirm={confirm}
          onOpenChange={() => console.log("open change")}
        >
          <Button
            type="text"
            danger
            icon={<DeleteFilled />}
            // onClick={handleDelete(record.id)}
          />{" "}
        </Popconfirm>
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
          {room?.name} -{" "}
          {
            //@ts-ignore
            room?.areaName
          }
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
        dataSource={room?.roomOrders}
        //        dataSource={data.map((room) => ({ ...room, key: room.id }))}
        style={{ padding: "0 auto " }}
      />
    </div>
  );
};

export default TableItem;

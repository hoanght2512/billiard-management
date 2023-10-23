"use client";
import { addRoom, deleteRoom, updateRoom } from "@/app/services/roomService";
import { Button, Form, Input, Select, message, Row, Col, Space } from "antd";
import React, { useEffect, useState } from "react";
import { IRoom } from "./interface";

interface IProps {
  room: IRoom | null;
  setEdit: (bool: boolean) => void;
}
const fullwidth: React.CSSProperties = {
  width: "100%",
};
const TableCRUD = (props: IProps) => {
  const [editing, setEdit] = useState(false);
  const [room, setRoom] = useState<IRoom | null>(props.room);
  useEffect(() => {
    setRoom(props.room);
    setEdit(true);
  }, [props]);
  const [roomDetail, setRoomDetail] = useState({
    name: "",
    area: {
      id: "",
    },
  });
  const handleUpdate = async (updId: any) => {
    await updateRoom(updId, roomDetail);
    setRoom(null);
    console.log(props.room);
    setEdit(false);
  };

  const handleChange = (event: any, field: any) => {
    let actualValue = event.target.value;
    setRoomDetail({
      ...roomDetail,
      [field]: actualValue,
    });
  };

  const handleSubmit = async (event: any) => {
    const product = await addRoom(roomDetail);
    if (product.status) {
      message.success("Thêm bàn thành công!");
    }
    console.log(product);
  };
  const handleClick = async (event: any) => {};
  const handleDelete = async (deleteId: any) => {
    try {
      await deleteRoom(deleteId);
      message.success("Xóa thành công!");
      setEdit(false);
      setRoom(null);
    } catch (error) {
      message.error("Lỗi!");
    }
  };
  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      onSubmitCapture={(e) => {
        e.preventDefault;
      }}
    >
      <Form.Item style={{ textAlign: "center" }}>
        {editing ? <h1>Cập nhật bàn</h1> : <h1>Tạo thêm bàn</h1>}
      </Form.Item>
      <Form.Item
        name={room?.name}
        label="name"
        initialValue={room?.name}
        rules={[
          {
            required: true,
            message: "Tên bàn không được để trống!",
          },
        ]}
      >
        <Input
          name="name"
          type="text"
          placeholder="Nhập tên bàn"
          value={roomDetail.name}
          onChange={(e) => handleChange(e, "name")}
        />
      </Form.Item>

      <Form.Item
        name="area"
        label="Area"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn khu vực",
          },
        ]}
      >
        <Select
          value={roomDetail.area.id}
          onChange={(value) =>
            setRoomDetail({
              ...roomDetail,
              area: {
                id: value,
              },
            })
          }
        >
          <Select.Option value="1">Khu vực 1</Select.Option>
          <Select.Option value="2">Khu vực 2</Select.Option>
        </Select>
      </Form.Item>

      <Row gutter={32} justify={"center"}>
        <Col span={16}>
          <Space direction="vertical" style={fullwidth}>
            <Space direction="vertical" style={fullwidth}>
              <Row gutter={16}>
                <Col span={12}>
                  {editing ? (
                    <Button
                      htmlType="button"
                      onClick={(e) => {
                        setEdit(false);
                        handleClick(e.preventDefault());
                        setRoom(null);
                      }}
                      size="large"
                      block
                    >
                      Hủy
                    </Button>
                  ) : (
                    <Button htmlType="submit" type="primary" size="large" block>
                      Thêm
                    </Button>
                  )}
                </Col>
                <Col span={12}>
                  {editing ? (
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={() => {
                        handleUpdate(room?.id);
                      }}
                    >
                      Sửa
                    </Button>
                  ) : (
                    <Button type="primary" size="large" block disabled>
                      Sửa
                    </Button>
                  )}
                </Col>
              </Row>
            </Space>
          </Space>
        </Col>
        <Col className="gutter-row" span={6}>
          <Space direction="vertical" style={fullwidth}>
            <Button
              type="primary"
              size="large"
              danger
              block
              onClick={() => {
                handleDelete(room?.id);
              }}
            >
              Xóa
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};
export default TableCRUD;

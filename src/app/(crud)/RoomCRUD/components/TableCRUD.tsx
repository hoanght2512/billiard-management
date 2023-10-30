"use client";
import { addRoom, deleteRoom, updateRoom } from "@/app/services/roomService";
import { findAll } from "@/app/services/areaService";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Row,
  Col,
  Space,
  Card,
  Popover,
  TourProps,
  Tour,
} from "antd";
import React, { useEffect, useState } from "react";
import { IRoom, DataTypeArea } from "./interface";
import { PlusOutlined } from "@ant-design/icons";
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
  const [data, setData] = useState<DataTypeArea[]>([]);
  const [roomDetail, setRoomDetail] = useState({
    name: "",
    area: {
      id: "",
    },
  });
  const fetchDataArea = async () => {
    const response = await findAll();
    //@ts-ignore
    setData(response);
  };
  useEffect(() => {
    setRoom(props.room);
    setEdit(true);
    fetchDataArea();
  }, [props]);

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
  const handleUpdate = async (updId: any) => {
    await updateRoom(updId, roomDetail);
    clearForm();
    console.log(props.room);
  };
  const handleDelete = async (deleteId: any) => {
    try {
      await deleteRoom(deleteId);
      message.success("Xóa thành công!");
      clearForm();
    } catch (error) {
      message.error("Lỗi!");
    }
  };
  const RemovePOP = (
    <div>
      <p>Nhấp vào Edit để xóa Room với Id!</p>
    </div>
  );
  // Để yên cho Rin Lê
  const handleClick = async (event: any) => {};
  const clearForm = () => {
    setRoom(null);
    setEdit(false);
    roomDetail.name = "";
  };
  return (
    <Card>
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
            {data.map((area) => (
              <Select.Option key={area.id} value={area.id}>
                {area.name}
              </Select.Option>
            ))}
            ;
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
                      <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                      >
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
              {!editing ? (
                <Popover content={RemovePOP} title="Lưu ý!">
                  <Button type="primary" size="large" danger block disabled>
                    Xóa
                  </Button>
                </Popover>
              ) : (
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
              )}
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default TableCRUD;

"use client";
import { findAllArea } from "@/app/services/areaService";
import {
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Space,
  Card,
  Popover,
  Radio,
} from "antd";
import React, { useEffect, useState } from "react";
import { IRoom, DataTypeArea, RoomDetail } from "@/lib/interfaceBase";
interface IProps {
  room?: IRoom;
  onSubmit: (room: RoomDetail, resetFormData: () => void) => void;
  onDelete: (roomId: number) => void;
  onUpdate: (roomId: number, room: RoomDetail) => void;
}
const initialValues: RoomDetail = {
  name: "",
  area: {
    id: "",
  },
  status: false,
};
const fullwidth: React.CSSProperties = {
  width: "100%",
};

const TableCRUD: React.FC<IProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const [dataArea, setDataArea] = useState<DataTypeArea[]>([]);
  const [form] = Form.useForm<RoomDetail>();
  const fetchDataArea = async () => {
    const response = await findAllArea();
    //@ts-ignore
    setDataArea(response);
  };
  useEffect(() => {
    fetchDataArea();
  }, []);
  useEffect(() => {
    if (props.room) {
      setEditing(true);
      form.setFieldsValue(props.room);
    }
  }, [form, props.room]);
  const handleSubmit = (data: RoomDetail) => {
    props.onSubmit(data, () => form.resetFields());
  };

  const handleUpdate = async (roomId: any) => {
    props.onUpdate(roomId, form.getFieldsValue());
  };

  const handleDelete = async (roomId: any) => {
    props.onDelete(roomId);
  };
  const RemovePOP = (
    <div>
      <p>Nhấp vào Edit để xóa Bàn với ID!</p>
    </div>
  );
  const handleClick = async (event: any) => {};
  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onSubmitCapture={(e) => {
          e.preventDefault;
        }}
        initialValues={initialValues}
      >
        <Form.Item style={{ textAlign: "center" }}>
          {editing ? <h1>Cập nhật bàn</h1> : <h1>Tạo thêm bàn</h1>}
        </Form.Item>
        <Form.Item
          name="name"
          label="name"
          rules={[
            {
              required: true,
              message: "Tên bàn không được để trống!",
            },
          ]}
        >
          <Input name="name" type="text" placeholder="Nhập tên bàn" />
        </Form.Item>

        <Form.Item
          name={["area", "id"]}
          label="Area"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn khu vực",
            },
          ]}
        >
          <Select>
            {dataArea.map((roomArea) => (
              <Select.Option key={roomArea.id} value={roomArea.id}>
                {roomArea.name}
              </Select.Option>
            ))}
            ;
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[
            {
              required: true,
              message: "Please select the status",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Mở</Radio>
            <Radio value={false}>Đóng</Radio>
          </Radio.Group>
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
                          setEditing(false);
                          handleClick(e.preventDefault());
                          form.resetFields();
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
                          handleUpdate(props.room?.id);
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
                    handleDelete(props.room?.id);
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

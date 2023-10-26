"use client";
import {
  addArea,
  deleteArea,
  updateArea,
} from "@/app/services/areaService";
import { Button, Form, Input, Select, message, Row, Col, Space } from "antd";
import React, { useEffect, useState } from "react";
import { IArea } from "./interface";

interface IProps {
  area: IArea | null;
  setEdit: (bool: boolean) => void;
}
const fullwidth: React.CSSProperties = {
  width: "100%",
};
const TableArea: React.FunctionComponent<IProps> = (props) => {
  const [editing, setEdit] = useState(false);
  const [area, setArea] = useState<IArea | null>(props.area);
  useEffect(() => {
    setArea(props.area);
    setEdit(true);
  }, [props]);

  const [areaDetail, setAreaDetail] = useState({
    name: "",
  });

  const handleUpdate = async (updId: any) => {
    await updateArea(updId, areaDetail);
    setArea(null);
    console.log(props.area);
    setEdit(false);
  };

  const handleChange = (event: any, field: any) => {
    let actualValue = event.target.value;
    setAreaDetail({
      ...areaDetail,
      [field]: actualValue,
    });
  };

  const handleSubmit = async (event: any) => {
    const unit = await addArea(areaDetail);
    if (unit.status) {
      message.success("Thêm khu vực thành công!");
    }
    console.log(unit);
  };
  const handleClick = async (event: any) => {};
  const handleDelete = async (deleteId: any) => {
    try {
      await deleteArea(deleteId);
      message.success("Xóa thành công!");
      setEdit(false);
      setArea(null);
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
        {editing ? (
          <h1>Cập nhật khu vực</h1>
        ) : (
          <h1>Tạo thêm khu vực</h1>
        )}
      </Form.Item>
      <Form.Item
        name={area?.name}
        label="Tên khu vực"
        initialValue={area?.name}
        rules={[
          {
            required: true,
            message: "Tên khu vực không được để trống!",
          },
        ]}
      >
        <Input
          name="name"
          type="text"
          placeholder="Nhập tên khu vực"
          value={areaDetail.name}
          onChange={(e) => handleChange(e, "name")}
        />
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
                        setArea(null);
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
                        handleUpdate(area?.id);
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
                handleDelete(area?.id);
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
export default TableArea;

"use client";
import { addUnit, deleteUnit, updateUnit } from "@/app/services/unitService";
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
} from "antd";
import React, { useEffect, useState } from "react";
import { IUnit } from "./interface";

interface IProps {
  unit: IUnit | null;
  setEdit: (bool: boolean) => void;
}
const fullwidth: React.CSSProperties = {
  width: "100%",
};
const TableUnit: React.FunctionComponent<IProps> = (props) => {
  const [editing, setEdit] = useState(false);
  const [unit, setUnit] = useState<IUnit | null>(props.unit);
  useEffect(() => {
    setUnit(props.unit);
    setEdit(true);
  }, [props]);

  const [unitDetail, setUnitDetail] = useState({
    name: "",
  });

  const handleUpdate = async (updId: any) => {
    await updateUnit(updId, unitDetail);
    setUnit(null);
    console.log(props.unit);
    setEdit(false);
  };

  const handleChange = (event: any, field: any) => {
    let actualValue = event.target.value;
    setUnitDetail({
      ...unitDetail,
      [field]: actualValue,
    });
  };

  const handleSubmit = async (event: any) => {
    const unit = await addUnit(unitDetail);
    if (unit.status) {
      message.success("Thêm đơn vị sản phẩm thành công!");
    }
    console.log(unit);
  };
  const handleClick = async (event: any) => {};
  const handleDelete = async (deleteId: any) => {
    try {
      await deleteUnit(deleteId);
      message.success("Xóa thành công!");
      setEdit(false);
      setUnit(null);
    } catch (error) {
      message.error("Lỗi!");
    }
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
          {editing ? (
            <h1>Cập nhật đơn vị sản phẩm</h1>
          ) : (
            <h1>Tạo thêm đơn vị sản phẩm</h1>
          )}
        </Form.Item>
        <Form.Item
          name={unit?.name}
          label="Tên đơn vị sản phẩm"
          initialValue={unit?.name}
          rules={[
            {
              required: true,
              message: "Tên đơn vị không được để trống!",
            },
          ]}
        >
          <Input
            name="name"
            type="text"
            placeholder="Nhập tên đơn vị sản phẩm"
            value={unitDetail.name}
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
                          setUnit(null);
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
                          handleUpdate(unit?.id);
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
                  handleDelete(unit?.id);
                }}
              >
                Xóa
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default TableUnit;

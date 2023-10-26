"use client";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "@/app/services/categoryService";
import { Button, Form, Input, Select, message, Row, Col, Space } from "antd";
import React, { useEffect, useState } from "react";
import { ICategory } from "./interface";

interface IProps {
  category: ICategory | null;
  setEdit: (bool: boolean) => void;
}
const fullwidth: React.CSSProperties = {
  width: "100%",
};
const TableCategory: React.FunctionComponent<IProps> = (props) => {
  const [editing, setEdit] = useState(false);
  const [category, setCategory] = useState<ICategory | null>(props.category);
  useEffect(() => {
    setCategory(props.category);
    setEdit(true);
  }, [props]);

  const [categoryDetail, setCategoryDetail] = useState({
    name: "",
  });

  const handleUpdate = async (updId: any) => {
    await updateCategory(updId, categoryDetail);
    setCategory(null);
    console.log(props.category);
    setEdit(false);
  };

  const handleChange = (event: any, field: any) => {
    let actualValue = event.target.value;
    setCategoryDetail({
      ...categoryDetail,
      [field]: actualValue,
    });
  };

  const handleSubmit = async (event: any) => {
    const category = await addCategory(categoryDetail);
    if (category.status) {
      message.success("Thêm danh mục sản phẩm thành công!");
    }
    console.log(category);
  };
  const handleClick = async (event: any) => {};
  const handleDelete = async (deleteId: any) => {
    try {
      await deleteCategory(deleteId);
      message.success("Xóa thành công!");
      setEdit(false);
      setCategory(null);
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
          <h1>Cập nhật danh mục sản phẩm</h1>
        ) : (
          <h1>Tạo thêm danh mục sản phẩm</h1>
        )}
      </Form.Item>
      <Form.Item
        name={category?.name}
        label="Tên danh mục sản phẩm"
        initialValue={category?.name}
        rules={[
          {
            required: true,
            message: "Tên danh mục không được để trống!",
          },
        ]}
      >
        <Input
          name="name"
          type="text"
          placeholder="Nhập tên danh mục sản phẩm"
          value={categoryDetail.name}
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
                        setCategory(null);
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
                        handleUpdate(category?.id);
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
                handleDelete(category?.id);
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
export default TableCategory;

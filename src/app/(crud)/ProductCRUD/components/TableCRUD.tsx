"use client";
import { findAllCategory } from "@/app/services/categoryService";
import { findAllUnit } from "@/app/services/unitService";
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
  Upload,
  InputNumber
} from "antd";
import React, { useEffect, useState } from "react";
import {
  IProduct,
  DataTypeCategory,
  DataTypeUnit,
  ProductDetail,
} from "./interface";

interface IProps {
  product?: IProduct;
  onSubmit: (product: ProductDetail, resetFormData: () => void) => void;
  onDelete: (productId: number) => void;
  onUpdate: (productId: number, product: ProductDetail) => void;
}

const initialValues: ProductDetail = {
  name: "",
  image: "",
  price: 0,
  productCategory: {
    id: "",
  },
  productUnit: {
    id: "",
  },
}

const fullwidth: React.CSSProperties = {
  width: "100%",
};

const TableCRUD: React.FC<IProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const [dataCategory, setDataCategory] = useState<DataTypeCategory[]>([]);
  const [dataUnit, setDataUnit] = useState<DataTypeUnit[]>([]);
  const [form] = Form.useForm<ProductDetail>();

  const fetchDataCategory = async () => {
    const response = await findAllCategory();
    //@ts-ignore
    setDataCategory(response);
  };

  const fetchDataUnit = async () => {
    const response = await findAllUnit();
    //@ts-ignore
    setDataUnit(response);
  };

  useEffect(() => {
    fetchDataCategory();
    fetchDataUnit();
  }, []);

  useEffect(() => {
    if (props.product) {
      setEditing(true);
      form.setFieldsValue(props.product)
    }
  }, [form, props.product]);

  const handleSubmit = (data: ProductDetail) => {
      props.onSubmit(data, () => form.resetFields());
  };

  const handleUpdate = async (productId: any) => {
    try {
      props.onUpdate(productId, form.getFieldsValue());
    } catch (error) {
      message.error("Lỗi!");
    }
  };

  const handleDelete = async (productId: any) => {
    try {
      props.onDelete(productId);
    } catch (error) {
      message.error("Lỗi!");
    }
  };
  const RemovePOP = (
    <div>
      <p>Nhấp vào Edit để xóa Product với Id!</p>
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
          {editing ? <h1>Cập nhật sản phẩm</h1> : <h1>Tạo thêm sản phẩm</h1>}
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[
            {
              required: true,
              message: "Tên sản phẩm không được để trống!",
            },
          ]}
        >
          <Input name="name" type="text" placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Ảnh sản phẩm"
          rules={[
            {
              required: true,
              message: "Ảnh sản phẩm không được để trống!",
            },
          ]}
        >
          <Input
            name="image"
            type="text"
            placeholder="Ảnh"
          />
          {/* <Upload maxCount={1} >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}
        </Form.Item>

        <Form.Item name="price" label="Giá sản phẩm">
          <InputNumber addonAfter="VNĐ" name="price" min={0}/>
        </Form.Item>

        <Form.Item
          name={["productCategory","id"]}
          label="Danh mục"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục sản phẩm",
            },
          ]}
        >
          <Select>
            {dataCategory.map((productCategory) => (
              <Select.Option
                key={productCategory.id}
                value={productCategory.id}
              >
                {productCategory.name}
              </Select.Option>
            ))}
            ;
          </Select>
        </Form.Item>

        <Form.Item
          name={["productUnit", "id"]}
          label="Đơn vị"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn đơn vị sản phẩm",
            },
          ]}
        >
          <Select>
            {dataUnit.map((productUnit) => (
              <Select.Option key={productUnit.id} value={productUnit.id}>
                {productUnit.name}
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
                          handleUpdate(props.product?.id);
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
                    handleDelete(props.product?.id);
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

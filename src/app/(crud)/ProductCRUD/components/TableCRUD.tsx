"use client";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "@/app/services/productService";
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
  Upload 
} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { IProduct, DataTypeCategory, DataTypeUnit } from "./interface";
import { PlusOutlined } from "@ant-design/icons";
import { rejects } from "assert";
interface IProps {
  product: IProduct | null;
  setEdit: (bool: boolean) => void;
}
const fullwidth: React.CSSProperties = {
  width: "100%",
};

const TableCRUD = (props: IProps) => {
  const [editing, setEdit] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(props.product);
  const [dataCategory, setDataCategory] = useState<DataTypeCategory[]>([]);
  const [dataUnit, setDataUnit] = useState<DataTypeUnit[]>([]);

  const [productDetail, setProductDetail] = useState({
    name: "",
    image: "",
    price: 0,
    category: {
      id: "",
    },
    unit: {
      id: "",
    },
  });

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
    setProduct(props.product);
    setEdit(true);
    fetchDataCategory();
    fetchDataUnit();
  }, [props]);

  const handleChange = (event: any, field: any) => {
    let actualValue = event.target.value;
    setProductDetail({
      ...productDetail,
      [field]: actualValue,
    });
  };

  const handleSubmit = async (event: any) => {
    const product = await addProduct(productDetail);
    if (product.status) {
      message.success("Thêm sản phẩm thành công!");
    }
    console.log(product);
  };
  const handleUpdate = async (updId: any) => {
    await updateProduct(updId, productDetail);
    clearForm();
    console.log(props.product);
  };
  const handleDelete = async (deleteId: any) => {
    try {
      await deleteProduct(deleteId);
      message.success("Xóa thành công!");
      clearForm();
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
  const clearForm = () => {
    setProduct(null);
    setEdit(false);
    productDetail.name = "";
    productDetail.image = "";
    productDetail.price = 0;
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
          {editing ? <h1>Cập nhật sản phẩm</h1> : <h1>Tạo thêm sản phẩm</h1>}
        </Form.Item>
        <Form.Item
          name={product?.name}
          label="Tên sản phẩm"
          initialValue={product?.name}
          rules={[
            {
              required: true,
              message: "Tên sản phẩm không được để trống!",
            },
          ]}
        >
          <Input
            name="name"
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={productDetail.name}
            onChange={(e) => handleChange(e, "name")}
          />
        </Form.Item>

        <Form.Item
          name={product?.image}
          label="Ảnh sản phẩm"
          initialValue={product?.image}
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
            value={productDetail.image}
            onChange={(e) => handleChange(e, "image")}
          />
          {/* <Upload maxCount={1} >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}
        </Form.Item>

        <Form.Item
          name={product?.price}
          label="Giá sản phẩm"
          initialValue={product?.price}
          rules={[
            {
              required: true,
              message: "Giá sản phẩm không được để trống!",
            },
          ]}
        >
          <Input
            name="price"
            type="number"
            min={0}
            placeholder="Nhập giá sản phẩm"
            value={productDetail.price}
            onChange={(e) => handleChange(e, "price")}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục sản phẩm",
            },
          ]}
        >
          <Select
            value={productDetail.category.id}
            onChange={(value) =>
              setProductDetail({
                ...productDetail,
                category: {
                  id: value,
                },
              })
            }
          >
            {dataCategory.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
            ;
          </Select>
        </Form.Item>

        <Form.Item
          name="unit"
          label="Đơn vị"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn đơn vị sản phẩm",
            },
          ]}
        >
          <Select
            value={productDetail.unit.id}
            onChange={(value) =>
              setProductDetail({
                ...productDetail,
                unit: {
                  id: value,
                },
              })
            }
          >
            {dataUnit.map((unit) => (
              <Select.Option key={unit.id} value={unit.id}>
                {unit.name}
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
                          setProduct(null);
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
                          handleUpdate(product?.id);
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
                    handleDelete(product?.id);
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

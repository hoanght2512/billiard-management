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
  Upload,
  List,
  Progress,
  Image,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { IProduct, DataTypeCategory, DataTypeUnit } from "./interface";
import { PlusOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { RcFile, UploadFile } from "antd/es/upload";

interface IProps {
  product: IProduct | null;
  setEdit: (bool: boolean) => void;
}
const fullwidth: React.CSSProperties = {
  width: "100%",
};
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const TableCRUD = (props: IProps) => {
  const [editing, setEdit] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(props.product);
  const [dataCategory, setDataCategory] = useState<DataTypeCategory[]>([]);
  const [dataUnit, setDataUnit] = useState<DataTypeUnit[]>([]);

  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const handleSelectedFile = (files: RcFile) => {
    // if (files && files[0].size < 10000000) {
    setImageFile(files);

    console.log(files);
    // } else {
    // message.error("File size to large");
    // }
  };
  const handleRemoveFile = () => setImageFile(undefined);

  // const handleUploadFile = () => {

  // };

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
    if (imageFile) {
      const name = imageFile.name;
      const urlImg = downloadURL;
      productDetail.image = urlImg;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on (
        "state_changed",
        (snapshot)  =>  {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
        },
        ()  => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url);
            const addPd = async () => {
              const product = await addProduct(productDetail);
            if (product.status) {
              handleRemoveFile();
              message.success("Thêm sản phẩm thành công!");
            }
            }
            addPd();
          });
        }
      );
    } else {
      message.error("File not found");
    }
    // console.log(product);
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
        {/* <Input
              type="file"
              placeholder="Select file to upload"
              accept="image/png"
              onChange={(files) => handleSelectedFile(files.target.files)}
            /> */}
        <Form.Item>
          <Upload
            name={product?.image}
            accept="image/png, image/jpg"
            action={"localhost:3000"}
            listType="picture-card"
            showUploadList={{ showRemoveIcon: true }}
            onPreview={handlePreview}
            beforeUpload={(file) => {
              handleSelectedFile(file);
              console.log(file.name);
              return false;
            }}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
          {imageFile && (
            <>
              {" "}
              <Progress percent={progressUpload} />
            </>
          )}
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="viewPicture"
              style={{ width: "100%" }}
              src={previewImage}
            />
          </Modal>
        </Form.Item>
        {/* <Card>
          {imageFile && (
            <>
              <List.Item
                extra={[
                  <Button
                    key="btnRemoveFile"
                    onClick={handleRemoveFile}
                    type="text"
                    icon={<i className="fas fa-times"></i>}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={imageFile.name}
                  description={`Size: ${imageFile.size}`}
                />
              </List.Item>

              <div className="text-right mt-3">
                <Button
                  loading={isUploading}
                  type="primary"
                  onClick={handleUploadFile}
                >
                  Upload
                </Button>

                <Progress percent={progressUpload} />
              </div>
            </>
          )}

          {downloadURL && (
            <>
              <Image
                src={downloadURL}
                alt={downloadURL}
                style={{ width: 200, height: 200, objectFit: "cover" }}
              />
              <p>{downloadURL}</p>
            </>
          )}
        </Card> */}
        {/* <Form.Item
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
          <Upload maxCount={1} >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item> */}

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
                        loading={isUploading}
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

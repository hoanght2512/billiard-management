"use client";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Space,
  Card,
  Popover,
  InputNumber,
  Modal,
  Radio,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { UserDetail, IUser } from "@/lib/interfaceBase";

interface IProps {
  user?: IUser;
  onSubmit: (user: UserDetail, resetFormData: () => void) => void;
  onDelete: (userId: number) => void;
  onUpdate: (userId: number, area: UserDetail) => void;
}
const initialValues: UserDetail = {
  username: "",
  password: "",
  email: "",
  fullname: "",
  roles: [],
};
const fullwidth: React.CSSProperties = {
  width: "100%",
};
const TableUser: React.FC<IProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm<UserDetail>();

  useEffect(() => {
    if (props.user) {
      setEditing(true);
      form.setFieldsValue(props.user);
    }
  }, [form, props.user]);
  const handleSubmit = () => {
    const data = form.getFieldsValue() as UserDetail;
    const selectedRole = data.roles;
    //@ts-ignore
    data.roles = [{ id: selectedRole }];
    props.onSubmit(data, () => {
      form.resetFields();
    });
  };

  const handleUpdate = async (userId: any) => {
    const data = form.getFieldsValue() as UserDetail;
    const selectedRole = data.roles;
    //@ts-ignore
    data.roles = [{ id: selectedRole }];
    props.onUpdate(userId, data);
  };

  const handleDelete = async (userId: any) => {
    Modal.confirm({
      title: "Bạn có muốn xóa ?",
      okText: "Yes",
      okType: "danger",
      width: "600px",
      onOk: () => {
        props.onDelete(userId);
      },
    });
  };
  const RemovePOP = (
    <div>
      <p>Nhấp vào Edit để xóa user với ID!</p>
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
          {editing ? <h1>Cập nhật tài khoản</h1> : <h1>Tạo thêm tài khoản</h1>}
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name="fullname"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            { min: 6, max: 20, message: "Tên đăng nhập từ 6-20 kí tự!" },
          ]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập Email!" },
            { type: "email", message: "Email không đúng định dạng!" },
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 8, max: 20, message: "Mật khẩu từ 8-20 kí tự!" },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="roles"
          // rules={[
          //   { required: true, message: "Vui lòng chọn ít nhất một vai trò!" },
          // ]}
        >
          <Typography style={{ color: "red", marginBottom: "10px" }}>
            Lưu ý: Khi "Thêm mới" mà chưa chọn Role thì sẽ tự động SET ROLE USER
          </Typography>
          <Radio.Group>
            <Radio value="1">Admin</Radio>
            <Radio value="2">User</Radio>
            {/* Add more roles as needed */}
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
                          handleUpdate(props.user?.id);
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
                    handleDelete(props.user?.id);
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
export default TableUser;

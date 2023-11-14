"use client";
import React, { useEffect, useState } from "react";
import { Col, Flex, Row, message } from "antd";
import UserController from "./components/ListUser";
import TableUser from "./components/TableCRUD";
import { UserDetail, IUser } from "@/lib/interfaceBase";
import {
  addUser,
  deleteUser,
  findAllUser,
  updateUser,
} from "@/app/services/userService";

const AppUserCTRL: React.FC = () => {
  const [editUser, setEditUser] = useState<IUser>();
  const [data, setData] = useState<IUser[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await findAllUser();
    //@ts-ignore
    setData(response);
  };
  const onCurrentUser = (user: IUser) => {
    setEditUser(user);
  };
  const onSubmmit = async (user: UserDetail, resetFormData: () => void) => {
    try {
      const res = await addUser(user);
      if (res) {
        message.success("Thêm tài khoản thành công!");
        resetFormData();
        fetchData();
      } else {
        message.error(res);
      }
    } catch (error) {
      //@ts-ignore
      message.error(error.response.data.message);
    }
  };

  const onUpdate = async (userId: number, user: UserDetail) => {
    const res = await updateUser(userId, user);
    if (res) {
      message.success("Cập nhật tài khoản thành công!");
      fetchData();
    } else {
      message.error(res);
    }
  };

  const onDelete = async (userId: number) => {
    const res = await deleteUser(userId);
    if (res) {
      message.success("Xóa thành công!");
      fetchData();
    } else {
      message.error(res);
    }
  };
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={10}>
          <Flex vertical>
            <TableUser
              user={editUser}
              onSubmit={onSubmmit}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
            {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
          </Flex>
        </Col>
        <Col span={13}>
          <UserController
            onEdit={onCurrentUser}
            data={data}
            onDelete={onDelete}
          />
        </Col>
      </Row>
    </>
  );
};

export default AppUserCTRL;

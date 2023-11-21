"use client";
import React, { useEffect, useState } from "react";
import { Col, Flex, Row, message } from "antd";
import RoomMain from "./components/TableCRUD";
import { IRoom, RoomDetail } from "@/lib/interfaceBase";
import {
  addRoom,
  deleteRoom,
  findAll,
  updateRoom,
} from "@/app/services/roomService";
import RoomController from "./components/ListRoom";
const AppRoomCTRL: React.FC = () => {
  const [editRoom, setEditRoom] = useState<IRoom>();
  const [data, setData] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await findAll();
      //@ts-ignore
      setData(response);
      setLoading(false);
    } catch (error) {}
  };

  const onCurrentRoom = (room: IRoom) => {
    setEditRoom(room);
  };

  const onSubmmit = async (room: RoomDetail, resetFormData: () => void) => {
    try {
      const res = await addRoom(room);
      if (res) {
        message.success("Thêm bàn thành công!");
        resetFormData();
        fetchData();
      }
    } catch (error) {
      message.success("Thêm bàn thất bại!");
      console.log(error);
    }
  };

  const onUpdate = async (roomId: number, room: RoomDetail) => {
    try {
      const res = await updateRoom(roomId, room);
      if (res) {
        message.success("Cập nhật bàn thành công!");
        fetchData();
      }
    } catch (error) {
      message.error("Cập nhật bàn thất bại!");
      console.log(error);
    }
  };

  const onDelete = async (roomId: number) => {
    try {
      const res = await deleteRoom(roomId);
      if (res) {
        message.success("Xóa thành công!");
        fetchData();
      }
    } catch (error) {
      message.success("Xóa thất bại!");
      console.log(error);
    }
  };
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={10}>
          <Flex vertical>
            <RoomMain
              room={editRoom}
              onSubmit={onSubmmit}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
            {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
          </Flex>
        </Col>
        <Col span={13} style={{ padding: 0, background: "" }}>
          <RoomController
            onEdit={onCurrentRoom}
            data={data}
            onDelete={onDelete}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default AppRoomCTRL;

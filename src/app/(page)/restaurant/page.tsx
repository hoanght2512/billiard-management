"use client";
import React, { useEffect, useState } from "react";
import { Col, Flex, Layout, Row, Tag, message } from "antd";
import TableItem from "./components/TableItem";
import TabList from "./components/TabList";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { IRoom, IRoomOrder, RoomOrderDetail } from "@/lib/interfaceBase";
import {
  addRoomOrder,
  changeRoomOrder,
  checkoutRoomOrder,
  deleteRoomOrder,
  findRoomOrderID,
  updateRoomOrder,
} from "@/app/services/roomOrderService";
import { findAll } from "@/app/services/roomService";

const footer: React.CSSProperties = {
  padding: "15px 0",
  borderTop: "2px solid #e8e8e8",
  width: "100%",
  backgroundColor: "#f0f0f0",
  borderBottomLeftRadius: "30px",
  borderBottomRightRadius: "30px"

};

const App: React.FC = () => {
  const [editRoom, setEditRoom] = useState<IRoom>();
  const [editRoomList, setEditRoomList] = useState<IRoom[]>([]);
  const [editRoomOrder, setEditRoomOrder] = useState<IRoomOrder[]>();
  const [total, setTotal] = useState<number>(0);

  const handleUpdateTotal = (total:number) => {
    setTotal(total);

  };
  const onCurrentRoomOrder = (roomOrder: IRoomOrder[]) => {
    setEditRoomOrder(roomOrder);
  };
  useEffect(() => {
    fetchData();
  });
  useEffect(() => {
    fetchRoomList();
  }, []);
  const fetchData = async () => {
    if (editRoom) {
      try {
        const response = await findRoomOrderID(editRoom.id);
        //@ts-ignore
        setEditRoomOrder(response);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  const fetchRoomList = async () => {
    try {
      const response = await findAll();
      //@ts-ignore
      setEditRoomList(response);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const onSubmmit = async (roomOrder: RoomOrderDetail) => {
    console.log(roomOrder)

    try {
      const res = await addRoomOrder(roomOrder);
    if (res) {
      message.success("Order thành công!");
      fetchData();
    }
    } catch (error) {
      message.config({
        maxCount: 1
      })
      message.error("Không thể Order lớn hơn 1 sản phẩm tính giờ!")
    }
  };
  const onDelete = async (roomOrderId: number) => {
    const res = await deleteRoomOrder(roomOrderId);
    if (res) {
      message.success("Xóa Order thành công!");
      fetchData();
    }
  };
  const handleQuantityChange = async (roomOrderId: number, roomOrder:RoomOrderDetail) => {
        //@ts-ignore
     await updateRoomOrder(roomOrderId, roomOrder)
    fetchData();
  }
  const onChangeRoomOrder = async (roomId: any, newRoomId: any) => {
    const res = await changeRoomOrder(roomId, newRoomId);
    console.log(res);
    if (res) {
      message.success("Đổi bàn thành công!");
      fetchData();
    }
  };
  const onCheckoutRoomOrder = async (roomId: any) => {
    const res = await checkoutRoomOrder(roomId);
    if (res) {
      message.success("Thanh toán thành công!");
      fetchData();
    }
  }
  const onCurrentRoom = (room: IRoom) => {
    setEditRoom(room);
    console.log(room);
  };
  return (
    <>
      <Nav />
      <Row justify={"space-between"} style={{backgroundColor: "#003a8c", padding:"30px"}}>
        <Col span={11} >
          <Flex vertical >
            <TableItem room={editRoom} onUpdate={handleQuantityChange} onDelete={onDelete} roomOrder={editRoomOrder} onUpdateTotal={handleUpdateTotal}/>
            <Flex vertical style={footer}>
              <Footer checkoutRoomOrder={onCheckoutRoomOrder} room={editRoom} changeRoom={onChangeRoomOrder} totalPrice={total}/>
            </Flex>
          </Flex>
        </Col>
        <Col span={12} >
          <TabList
            onSubmit={onSubmmit}
            roomList={editRoomList}
            room={editRoom}
            onEditRoom={onCurrentRoom}
            onEdit={onCurrentRoomOrder}
          />
        </Col>
      </Row>
    </>
  );
};

export default App;

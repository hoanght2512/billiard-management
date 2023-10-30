'use client'
import React, { useEffect, useState } from 'react'
import { Col, Flex, Layout, Row, Tag, theme } from 'antd'
import RoomController from './components/ListRoom'
import RoomMain from './components/TableCRUD'
import { IRoom } from './components/interface'

const initCurrentUser: IRoom = { name: "", id: "", area:{
  id: "",
  // name: "", 
} };

const AppRoomCTRL: React.FC = () => {
  const [editRoom, setEditRoom] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);

  const onCurrentRoom = (room: IRoom) => {
    setEditRoom(room);
    // setEdit(true);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
    <Row justify={'space-between'}>   
      <Col span={12}>
        <Flex vertical>
          <RoomMain room={editRoom} setEdit={setEdit}/>
          {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
        </Flex>
      </Col>
      <Col span={11} style={{ padding: 0, background: "" }}>
        <RoomController onEdit={onCurrentRoom}/>
      </Col>
    </Row>
    </>
  )
}

export default AppRoomCTRL

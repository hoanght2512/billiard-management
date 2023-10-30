'use client'
import React, { useEffect, useState } from 'react'
import { Col, Flex, Layout, Row, Tag } from 'antd'
import AreaController from './components/ListArea'
import TableArea from './components/TableCRUD'
import { IArea } from './components/interface'

const initCurrentUser: IArea = { name: "", id: "" };

const AppAreaCTRL: React.FC = () => {
  const [editArea, setEditArea] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);

  const onCurrentCategory = (area: IArea) => {
    setEditArea(area);
    // setEdit(true);
  };
  
  return (
    <>
    <Row justify={'space-between'}>   
      <Col span={12}>
        <Flex vertical>
          <TableArea area={editArea} setEdit={setEdit}/>
          {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
        </Flex>
      </Col>
      <Col span={11}>
        <AreaController onEdit={onCurrentCategory}/>
      </Col>
    </Row>
    </>
  )
}

export default AppAreaCTRL

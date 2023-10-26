'use client'
import React, { useEffect, useState } from 'react'
import { Col, Flex, Layout, Row, Tag } from 'antd'
import UnitController from './components/ListUnit'
import TableUnit from './components/TableCRUD'
import { IUnit } from './components/interface'

const initCurrentUser: IUnit = { name: "", id: "" };

const Unit: React.FC = () => {
  const [editUnit, setEditUnit] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);

  const onCurrentCategory = (unit: IUnit) => {
    setEditUnit(unit);
    // setEdit(true);
  };
  
  return (
    <>
    <Row justify={'space-between'}>   
      <Col span={12}>
        <Flex vertical>
          <TableUnit unit={editUnit} setEdit={setEdit}/>
          {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
        </Flex>
      </Col>
      <Col span={11}>
        <UnitController onEdit={onCurrentCategory}/>
      </Col>
    </Row>
    </>
  )
}

export default Unit

'use client'
import React, { useEffect, useState } from 'react'
import { Col, Flex, Layout, Row, Tag } from 'antd'
import CategoryController from './components/ListCategory'
import TableCategory from './components/TableCRUD'
import { ICategory } from './components/interface'

const initCurrentUser: ICategory = { name: "", id: "" };

const AppCategoryCTRL: React.FC = () => {
  const [editCategory, setEditCategory] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);

  const onCurrentCategory = (category: ICategory) => {
    setEditCategory(category);
    // setEdit(true);
  };
  
  return (
    <>
    <Row justify={'space-between'}>   
      <Col span={12}>
        <Flex vertical>
          <TableCategory category={editCategory} setEdit={setEdit}/>
          {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
        </Flex>
      </Col>
      <Col span={11}>
        <CategoryController onEdit={onCurrentCategory}/>
      </Col>
    </Row>
    </>
  )
}

export default AppCategoryCTRL

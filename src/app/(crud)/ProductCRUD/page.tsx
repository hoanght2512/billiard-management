'use client'
import React, { useEffect, useState } from 'react'
import { Col, Flex, Layout, Row, Tag, theme } from 'antd'
import ProductController from './components/ListProduct'
import ProductMain from './components/TableCRUD'
import { IProduct } from './components/interface'

const initCurrentUser: IProduct = { name: "", id: "",image: "", price: 0,
  category:{
    id: "",
    // name: "", 
  },unit:{
  id: "",
  // name: "", 
} };

const AppProductCTRL: React.FC = () => {
  const [editProduct, setEditProduct] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);

  const onCurrentRoom = (product: IProduct) => {
    setEditProduct(product);
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
          <ProductMain product={editProduct} setEdit={setEdit}/>
          {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
        </Flex>
      </Col>
      <Col span={11} style={{ padding: 0, background: "" }}>
        <ProductController onEdit={onCurrentRoom}/>
      </Col>
    </Row>
    </>
  )
}

export default AppProductCTRL

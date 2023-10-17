'use client'
import React from 'react'
import { Col, Flex, Layout, Row, Tag } from 'antd'
import TableItem from './components/TableItem'
import TabList from './components/TabList'
import Footer from './components/Footer'

const App: React.FC = () => {
  return (
    <Row justify={'space-between'}>
      <Col span={13}>
        <Flex vertical>
          <TableItem />
          <Flex vertical>
            <Footer />
          </Flex>
        </Flex>
      </Col>
      <Col span={11}>
        <TabList />
      </Col>
    </Row>
  )
}

export default App

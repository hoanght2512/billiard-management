'use client'
import { Button, Typography, Space, Card, Row, Col } from 'antd'
import React from 'react'
import TableItem from './TableItem'
const { Text } = Typography
const Footer = () => {
  return (
    <Row
      style={{
        padding: '20px',
        backgroundColor: '#f1f2f5',
      }}
    >
      <Col span={18}>
        <Space wrap>
          <Card hoverable cover size="small">
            <Text strong>Tìm Khách Hàng</Text>
          </Card>
          <Card hoverable cover size="small">
            <Text strong>Chuyển Bàn</Text>
          </Card>
          <Card hoverable cover size="small">
            <Text strong>Đặt Bàn</Text>
          </Card>
          <Card hoverable cover size="small">
            <Text strong>Tạm Tính</Text>
          </Card>
        </Space>
      </Col>
      <Col span={6}>
        <Text strong>Tổng tiền: 0</Text>
        <Card hoverable cover>
          <Text strong>Thanh Toán</Text>
        </Card>
      </Col>
    </Row>
  )
}

export default Footer

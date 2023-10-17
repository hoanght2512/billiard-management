'use client'
import { Button, Typography, Space, Card, Row, Col } from 'antd'
import React from 'react'
const { Text } = Typography

const fullwidth: React.CSSProperties = {
  width: '100%',
}

const Footer = () => {
  return (
    <Row gutter={32} justify={'center'}>
      <Col span={16}>
        <Space direction="vertical" style={fullwidth}>
          <Space direction="vertical" style={fullwidth}>
            <Row gutter={16}>
              <Col span={12}>
                <Button type="primary" block>
                  Tìm khách hàng
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" block>
                  Chuyển bàn
                </Button>
              </Col>
            </Row>
          </Space>
          <Space
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Button type="primary" block>
                  Giảm giá
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" block>
                  Tạm tính
                </Button>
              </Col>
            </Row>
          </Space>
        </Space>
      </Col>
      <Col className="gutter-row" span={6}>
        <Space direction="vertical" style={fullwidth}>
          <Text strong>
            Tổng cộng:
            <Text type="danger"> 120.000 đ</Text>
          </Text>
          <Button type="primary" size="large" danger block>
            Thanh toán
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Footer

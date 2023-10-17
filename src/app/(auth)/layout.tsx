import React from 'react'
import { Card, Col, Layout, Row } from 'antd'
import '@/style/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout >
      <Row style={{minHeight: '100vh'}} justify={'center'} >
        <Col style={{marginTop:60}} span={10}>{children}</Col>
      </Row>
    </Layout>
  )
}

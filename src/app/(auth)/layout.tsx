import React from 'react'
import '@/styles/globals.css'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container fluid>
      <Row>
        <Col as={Card} color="white" md={{ span: 6, offset: 3 }}>
          <CardBody>{children}</CardBody>
        </Col>
      </Row>
    </Container>
  )
}

'use client'
import { Card, Image, List, Tag, Typography } from 'antd'
import React from 'react'

const { Text } = Typography
const { Meta } = Card

const formatCurrency = (value: number) => {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
}

const data = [
  {
    title: 'Sản phẩm 1111111111111111',
    price: 10000,
  },
  {
    title: 'Sản phẩm 2',
    price: 10000,
  },
  {
    title: 'Sản phẩm 3',
    price: 10000,
  },
  {
    title: 'Sản phẩm 4',
    price: 10000,
  },
  {
    title: 'Sản phẩm 5',
    price: 10000,
  },
  {
    title: 'Sản phẩm 6',
    price: 10000,
  },
]

const ListProduct = () => {
  return (
    <List
      grid={{ gutter: 5, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 3 }}
      style={{ padding: '10px', minHeight: '90vh' }}
      dataSource={data}
      renderItem={(item) => {
        const { title } = item
        return (
          <List.Item>
            <Card
              size="small"
              hoverable
              cover={
                <Image
                  src={
                    'https://product.hstatic.net/1000141988/product/bia_heineken_lon_330_ml__2__e607f29d5ed642bc90f03c70c45c45a0.jpg'
                  }
                  alt="product"
                  preview={false}
                />
              }
            >
              <Tag
                color="#f50"
                style={{
                  position: 'absolute',
                  right: '-5px',
                  top: '2px',
                }}
              >
                {formatCurrency(item.price)}
              </Tag>
              <Text
                style={{
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </Text>
            </Card>
          </List.Item>
        )
      }}
    />
  )
}

export default ListProduct

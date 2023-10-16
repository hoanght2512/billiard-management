'use client'
import { Button, Space, Tabs, TabsProps } from 'antd'
import React from 'react'
import ListRoom from './ListRoom'
import ListProduct from './ListProduct'

const onChange = (key: string) => {
  console.log(key)
}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: <Button>Bàn</Button>,
    children: <ListRoom />,
  },
  {
    key: '2',
    label: <Button>Sản Phẩm</Button>,
    children: <ListProduct />,
  },
]
const TabList = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      style={{
        margin: '0 auto',
        backgroundColor: '#f5f5f5',
      }}
      items={items}
      onChange={onChange}
      centered
    />
  )
}

export default TabList

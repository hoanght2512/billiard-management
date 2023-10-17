'use client'
import React from 'react'
import { Button, InputNumber, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteFilled } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const { Text } = Typography

interface DataType {
  key: number
  name: string
  unit: string
  hourly: boolean
  quantity: number
  price: number
}

const handleDelete = (id: number) => () => {
  console.log(id)
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
}
const columns: ColumnsType<DataType> = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    render: (name, record) => (
      <>
        {record.hourly && (
          <Tag color="#f50">
            <FontAwesomeIcon icon={faClock} />
          </Tag>
        )}
        <Text strong>{name}</Text>
      </>
    ),
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
    key: 'unit',
    width: '10%',
    render: (unit) => <Tag color="#f50">{unit}</Tag>,
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    width: '10%',
    render(value, record, index) {
      const { unit } = record
      const step = unit === 'Giờ' ? 0.1 : 1
      const min = unit === 'Giờ' ? 0.1 : 1
      return (
        <InputNumber
          min={min}
          step={step}
          defaultValue={value}
          disabled={unit === 'Giờ' ? index === 0 : false}
        />
      )
    },
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
    key: 'price',
    width: '10%',
    render: (price) => formatCurrency(price),
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
    width: '10%',
    render: (_, record) => {
      const { quantity, price } = record
      return formatCurrency(quantity * price)
    },
  },
  {
    title: '',
    key: 'key',
    width: '5%',
    render: (_, record) => (
      <Button
        type="text"
        danger
        icon={<DeleteFilled />}
        onClick={handleDelete(record.key)}
      />
    ),
  },
]

const data: DataType[] = [
  {
    key: 1,
    name: 'Tiền giờ',
    unit: 'Giờ',
    hourly: true,
    quantity: 0.5,
    price: 100000,
  },
  {
    key: 2,
    name: 'Bia',
    unit: 'Lon',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 3,
    name: 'Nước ngọt',
    unit: 'Lon',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 4,
    name: 'Mồi',
    unit: 'Phần',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 2,
    name: 'Bia',
    unit: 'Lon',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 3,
    name: 'Nước ngọt',
    unit: 'Lon',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 4,
    name: 'Mồi',
    unit: 'Phần',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 2,
    name: 'Bia',
    unit: 'Lon',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 3,
    name: 'Nước ngọt',
    unit: 'Lon',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 4,
    name: 'Mồi',
    unit: 'Phần',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 2,
    name: 'Bia',
    unit: 'Lon',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 3,
    name: 'Nước ngọt',
    unit: 'Lon',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
  {
    key: 4,
    name: 'Mồi',
    unit: 'Phần',
    hourly: false,
    quantity: 1,
    price: 100000,
  },
]

const TableItem = () => {
  return (
    <Table
      size="small"
      pagination={false}
      columns={columns}
      dataSource={data}
      style={{
        minHeight: '82vh',
        maxHeight: '82vh',
        overflowY: 'scroll',
      }}
    />
  )
}

export default TableItem

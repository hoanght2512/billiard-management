'use client'
import { findAll } from '@/app/services/roomService'
import { Card, List, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const { Text } = Typography

// const data = [
//   {
//     title: 'Bàn 1',
//   },
//   {
//     title: 'Bàn 2',
//   },
//   {
//     title: 'Bàn 3',
//   },
//   {
//     title: 'Bàn 4',
//   },
//   {
//     title: 'Bàn 5',
//   },
//   {
//     title: 'Bàn 6',
//   },
// ]

const ListRoom = () => {
  const [data, setData] = useState<[]>([]);

  const listData = async () => {
    const response = await findAll();
    //@ts-ignore
    setData(response);
  };
  useEffect(() => {
    listData();
  }, [data]);
  return (
    <List
      grid={{ gutter: 5, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 3 }}
      style={{ padding: '10px', minHeight: '90vh' }}
      dataSource={data}
      renderItem={(item) => {
        const { name } = item
        return (
          <List.Item>
            <Card
              size="small"
              hoverable
              cover
              style={{
                textAlign: 'center',
                minHeight: '90px',
              }}
            >
              <Text strong>{name}</Text>
              <br />
              <Text type="secondary">Trống</Text>
            </Card>
          </List.Item>
        )
      }}
    />
  )
}

export default ListRoom

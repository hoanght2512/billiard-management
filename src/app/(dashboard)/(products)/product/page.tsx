// 'use client'
// import React from 'react'
// import { Container, Table } from 'react-bootstrap'

'use client'

import {Table, Button, Modal, Input} from "antd"
import {useState} from 'react'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

interface Product {
  id: number
  name: string
  description: string
  price: number
  discount: number
  image: string
  category: string
  unit: string
}
function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [dataSource, setDataSource] = useState([
      {
          id: 1,
          name: 'Coca',
          price: '12000',
          description: 'coca'
      },
      {
          id: 2,
          name: 'Sting',
          price: '12000',
          description: 'sting'
      },
      {
          id: 3,
          name: 'BoHuc',
          price: '12000',
          description: 'BoHuc'
      },
      {
        id: 4,
        name: 'RedBull',
        price: '12000',
        description: 'RedBull'
    },
    {
      id: 5,
      name: 'Revive',
      price: '12000',
      description: 'Revive'
  }
  ]);



 const columns= [
  {
      key: '1',
      title: 'ID',
      dataIndex: 'id'
  },
  {
      key: '2',
      title: 'Name',
      dataIndex: 'name'
  },
  {
      key: '3',
      title: 'Price',
      dataIndex: 'price'
  },
  {
      key: '4',
      title: 'Description',
      dataIndex: 'description'
  },
  {
    key: '5',
    title: 'Actions',
    render: (record) => {
      return(
      <>
      <EditOutlined
       onClick={() => {
        onEditItem(record);
      }} />
      <DeleteOutlined onClick={()=>{
        onDeleteItem(record)
      }} style={{color: "red", marginLeft: 12}} />
      </>
      );
    },
  },
];


 

 
const onAddItem=()=>{
  // const randomNumber = parseInt(Math.random()*1000)
  const newItem = {
      
          id: 6,
          name: 'Dr Thanh',
          price: '12000',
          description: 'Dr Thanh'
      
  }
  setDataSource((pre) => {
      return [...pre, newItem];
  })
}

const onDeleteItem=(record)=>{
  Modal.confirm({
    title:'Are you sure to delete this item?',
    okText: 'yes',
    okType: 'danger',
    onOk:()=>{
      setDataSource((pre)=>{
        return pre.filter((item) => item.id !== record.id);
        });
    }
  })

};

const onEditItem= (record) => {
  setIsEditing(true);
  setEditingItem({...record})
};

return (
  <div className="App">
       <header className="App-header">
       <Button onClick={onAddItem}>Add a item</Button>
       <Table
       columns={columns}
       dataSource={dataSource}
       >
       </Table>
       <Modal  title="Edit Item"
       visible={isEditing}
       okText="Save"
       onCancel={() => {
        setIsEditing(false);
       }}
       onOk={()=>{
         setIsEditing(false);
       }}
       >
        <Input value={editingItem?.name} onChange={(e)=>{
          setEditingItem(pre=>{
            return {...pre, name:e.target.value}
          })
        }} />
        
        </Modal>
       </header>
  </div>
  );

}


export default App

'use client'
import React, { useEffect, useState } from 'react'
import { Col, Flex, Row, message } from 'antd'
import AreaController from './components/ListArea'
import TableArea from './components/TableCRUD'
import { IArea, AreaDetail } from '@/lib/interfaceBase'
import {
  addArea,
  deleteArea,
  findAllArea,
  updateArea,
} from "@/app/services/areaService";

const AppAreaCTRL: React.FC = () => {
  const [editArea, setEditArea] = useState<IArea>();
  const [data, setData] = useState<IArea[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await findAllArea();
    //@ts-ignore
    setData(response);
  };
  const onCurrentArea = (area: IArea) => {
    setEditArea(area);
  };
  const onSubmmit = async (area: AreaDetail, resetFormData: () => void) => {
    const res = await addArea(area);
    if (res) {
      message.success("Thêm khu vực thành công!");
      resetFormData();
      fetchData();
    }
  };

  const onUpdate = async (areaId: number, area: AreaDetail) => {
    const res = await updateArea(areaId, area);
    if (res) {
      message.success("Cập nhật khu vực thành công!");
      fetchData();
    }
  };

  const onDelete = async (areaId: number) => {
    const res = await deleteArea(areaId);
    if (res) {
      message.success("Xóa thành công!");
      fetchData();
    }
  };
  return (
    <>
    <Row justify={'space-between'}>   
      <Col span={10}>
        <Flex vertical>
          <TableArea area={editArea}
              onSubmit={onSubmmit}
              onDelete={onDelete}
              onUpdate={onUpdate}/>
          {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
        </Flex>
      </Col>
      <Col span={13}>
        <AreaController onEdit={onCurrentArea}
            data={data}
            onDelete={onDelete}/>
      </Col>
    </Row>
    </>
  )
}

export default AppAreaCTRL

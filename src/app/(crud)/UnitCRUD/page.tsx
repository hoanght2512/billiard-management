"use client";
import React, { useEffect, useState } from "react";
import { Col, Flex, Row, message } from "antd";
import UnitController from "./components/ListUnit";
import TableUnit from "./components/TableCRUD";
import { IUnit, UnitDetail } from "@/lib/interfaceBase";
import {
  addUnit,
  findAllUnit,
  deleteUnit,
  updateUnit,
} from "@/app/services/unitService";

const AppUnitCTRL: React.FC = () => {
  const [editUnit, setEditUnit] = useState<IUnit>();
  const [data, setData] = useState<IUnit[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await findAllUnit();
    //@ts-ignore
    setData(response);
  };
  const onCurrentUnit = (unit: IUnit) => {
    setEditUnit(unit);
  };
  const onSubmmit = async (unit: UnitDetail, resetFormData: () => void) => {
    const res = await addUnit(unit);
    if (res) {
      message.success("Thêm loại thành công!");
      resetFormData();
      fetchData();
    }
  };

  const onUpdate = async (unitId: number, unit: UnitDetail) => {
    const res = await updateUnit(unitId, unit);
    if (res) {
      message.success("Cập nhật loại thành công!");
      fetchData();
    }
  };

  const onDelete = async (unitId: number) => {
    const res = await deleteUnit(unitId);
    if (res) {
      message.success("Xóa thành công!");
      fetchData();
    }
  };
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={10}>
          <Flex vertical>
            <TableUnit
              unit={editUnit}
              onSubmit={onSubmmit}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
            {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
          </Flex>
        </Col>
        <Col span={13}>
          <UnitController
            onEdit={onCurrentUnit}
            data={data}
            onDelete={onDelete}
          />
        </Col>
      </Row>
    </>
  );
};

export default AppUnitCTRL;

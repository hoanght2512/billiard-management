"use client";
import React, { useEffect, useState } from "react";
import { Col, Flex, Row, message } from "antd";
import CustomerController from "./components/ListCustomer";
import TableCustomer from "./components/TableCRUD";
import { CustomerDetail, ICustomer } from "@/lib/interfaceBase";
import {
  addCustomer,
  deleteCustomer,
  findAllCustomer,
  updateCustomer,
} from "@/app/services/customerService";

const AppCustomerCTRL: React.FC = () => {
  const [editCustomer, setEditCustomer] = useState<ICustomer>();
  const [data, setData] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await findAllCustomer();
      //@ts-ignore
      setData(response);
      setLoading(false);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };
  const onCurrentCustomer = (customer: ICustomer) => {
    setEditCustomer(customer);
  };
  const onSubmmit = async (
    customer: CustomerDetail,
    resetFormData: () => void
  ) => {
    try {
      const res = await addCustomer(customer);
      if (res) {
        message.success("Thêm khách hàng thành công!");
        resetFormData();
        fetchData();
      } else {
        message.error(res);
      }
    } catch (error) {}
  };

  const onUpdate = async (customerId: number, customer: CustomerDetail) => {
    try {
      const res = await updateCustomer(customerId, customer);
      if (res) {
        message.success("Cập nhật khách hàng thành công!");
        fetchData();
      } else {
        message.error(res);
      }
    } catch (error) {}
  };

  const onDelete = async (customerId: number) => {
    try {
      const res = await deleteCustomer(customerId);
      if (res) {
        message.success("Xóa thành công!");
        fetchData();
      } else {
        message.error(res);
      }
    } catch (error) {}
  };
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={10}>
          <Flex vertical>
            <TableCustomer
              customer={editCustomer}
              onSubmit={onSubmmit}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
            {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
          </Flex>
        </Col>
        <Col span={13} >
          <CustomerController
            onEdit={onCurrentCustomer}
            data={data}
            onDelete={onDelete}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default AppCustomerCTRL;

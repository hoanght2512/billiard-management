"use client";
import React, { useEffect, useState } from "react";
import { Col, Flex, Row, message } from "antd";
import CategoryController from "./components/ListCategory";
import TableCategory from "./components/TableCRUD";
import { CategoryDetail, ICategory } from "@/lib/interfaceBase";
import {
  addCategory,
  deleteCategory,
  findAllCategory,
  updateCategory,
} from "@/app/services/categoryService";

const AppCategoryCTRL: React.FC = () => {
  const [editCategory, setEditCategory] = useState<ICategory>();
  const [data, setData] = useState<ICategory[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await findAllCategory();
    //@ts-ignore
    setData(response);
  };
  const onCurrentCategory = (category: ICategory) => {
    setEditCategory(category);
  };
  const onSubmmit = async (
    category: CategoryDetail,
    resetFormData: () => void
  ) => {
    const res = await addCategory(category);
    if (res) {
      message.success("Thêm danh mục thành công!");
      resetFormData();
      fetchData();
    }
  };

  const onUpdate = async (categoryId: number, category: CategoryDetail) => {
    const res = await updateCategory(categoryId, category);
    if (res) {
      message.success("Cập nhật danh mục thành công!");
      fetchData();
    }
  };

  const onDelete = async (categoryId: number) => {
    const res = await deleteCategory(categoryId);
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
            <TableCategory
              category={editCategory}
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
          <CategoryController
            onEdit={onCurrentCategory}
            data={data}
            onDelete={onDelete}
          />
        </Col>
      </Row>
    </>
  );
};

export default AppCategoryCTRL;

import { axiosClient } from "@/lib/http/axios-client";

interface categoryPayload {
    [x: string]: unknown
  }
  export const findAll = async () => {
    const allCategory = await axiosClient.get("http://localhost:8080/api/v1/categories")
    return allCategory;
  }
  export const categoryById = async (editId: any) => {
    const categoryById = await axiosClient.get(`http://localhost:8080/api/v1/categories/${editId}`);
    return categoryById;
  }
  export const addCategory = async (categoryDetail: categoryPayload) => {
    const category = await axiosClient.post("http://localhost:8080/api/v1/categories", JSON.stringify(categoryDetail));
    return category;
  }
  export const deleteCategory = async (deleteId: any) => {
    const delCategory = await axiosClient.delete(`http://localhost:8080/api/v1/categories/${deleteId}`)
    return delCategory;
  }
  export const updateCategory = async (updId:any,categoryDetail: categoryPayload) => {
    const updateCategory = await axiosClient.put(`http://localhost:8080/api/v1/categories/${updId}`, JSON.stringify(categoryDetail));
    return updateCategory;
}

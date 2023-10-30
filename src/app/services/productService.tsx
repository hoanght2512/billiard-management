import { axiosClient } from "@/lib/http/axios-client";

interface productPayload {
  [x: string]: unknown
}

  export const findAll = async () => {
    const response = await axiosClient.get("http://localhost:8080/api/v1/products")
    return response;
  }
  export const productById = async (editId: any) => {
    const response = await axiosClient.get(`http://localhost:8080/api/v1/products/${editId}`);
    return response;
  }
  export const addProduct = async (productDetail: productPayload) => {
    const response = await axiosClient.post("http://localhost:8080/api/v1/products", JSON.stringify(productDetail));
    return response;
  }
  export const deleteProduct = async (deleteId: any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/v1/products/${deleteId}`)
    return response;
  }
  export const updateProduct = async (updId:any,productDetail: productPayload) => {
    const response = await axiosClient.put(`http://localhost:8080/api/v1/products/${updId}`, JSON.stringify(productDetail));
    return response;
}
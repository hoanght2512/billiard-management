import { axiosClient } from "@/lib/http/axios-client";

interface orderPayload {
    [x: string]: any
  }
  export const findAllOrder = async () => {
    const response = await axiosClient.get("http://localhost:8080/api/v1/orders")
    return response;
  }
  export const orderById = async (editId: any) => {
    const response = await axiosClient.get(`http://localhost:8080/api/v1/orders/${editId}`);
    return response;
  }
  export const addOrder = async (orderDetail: orderPayload) => {
    const response = await axiosClient.post("http://localhost:8080/api/v1/orders", JSON.stringify(orderDetail));
    return response;
  }
  export const deleteOrder = async (deleteId: any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/v1/orders/${deleteId}`)
    return response;
  }
  export const updateOrder = async (updId:any, orderDetail: orderPayload) => {
    const response = await axiosClient.put(`http://localhost:8080/api/v1/orders/${updId}`, JSON.stringify(orderDetail));
    return response;
}

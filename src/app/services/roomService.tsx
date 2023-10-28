import { axiosClient } from "@/lib/http/axios-client";
import { saveStorage } from "@/utils/storage";

interface productPayload {
    [x: string]: unknown
  }
  export const findAll = async () => {
    const response = await axiosClient.get("http://localhost:8080/api/v1/rooms")
    return response;
  }
  export const roomById = async (editId: any) => {
    const response = await axiosClient.get(`http://localhost:8080/api/v1/rooms/${editId}`);
    return response;
  }
  export const addRoom = async (productDetail: productPayload) => {
    const response = await axiosClient.post("http://localhost:8080/api/v1/rooms", JSON.stringify(productDetail));
    return response;
  }
  export const deleteRoom = async (deleteId: any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/v1/rooms/${deleteId}`)
    return response;
  }
  export const updateRoom = async (updId:any,productDetail: productPayload) => {
    const response = await axiosClient.put(`http://localhost:8080/api/v1/rooms/${updId}`, JSON.stringify(productDetail));
    return response;
}

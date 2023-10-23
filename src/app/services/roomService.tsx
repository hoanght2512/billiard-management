import { axiosClient } from "@/lib/http/axios-client";
import { saveStorage } from "@/utils/storage";

interface productPayload {
    [x: string]: unknown
  }
  export const findAll = async () => {
    const allRoom = await axiosClient.get("http://localhost:8080/api/v1/rooms")
    return allRoom;
  }
  export const roomById = async (editId: any) => {
    const roomById = await axiosClient.get(`http://localhost:8080/api/v1/rooms/${editId}`);
    return roomById;
  }
  export const addRoom = async (productDetail: productPayload) => {
    const product = await axiosClient.post("http://localhost:8080/api/v1/rooms", JSON.stringify(productDetail));
    return product;
  }
  export const deleteRoom = async (deleteId: any) => {
    const delRoom = await axiosClient.delete(`http://localhost:8080/api/v1/rooms/${deleteId}`)
    return delRoom
  }
  export const updateRoom = async (updId:any,productDetail: productPayload) => {
    const updateRoom = await axiosClient.put(`http://localhost:8080/api/v1/rooms/${updId}`, JSON.stringify(productDetail));
    return updateRoom
}

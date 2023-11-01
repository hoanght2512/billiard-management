import { axiosClient } from "@/lib/http/axios-client";

interface areaPayload {
    [x: string]: any
  }
  export const findAllArea = async () => {
    const response = await axiosClient.get("http://localhost:8080/api/v1/areas")
    return response;
  }
  export const areaById = async (editId: any) => {
    const response = await axiosClient.get(`http://localhost:8080/api/v1/areas/${editId}`);
    return response;
  }
  export const addArea = async (areaDetail: areaPayload) => {
    const response = await axiosClient.post("http://localhost:8080/api/v1/areas", JSON.stringify(areaDetail));
    return response;
  }
  export const deleteArea = async (deleteId: any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/v1/areas/${deleteId}`)
    return response;
  }
  export const updateArea = async (updId:any, areaDetail: areaPayload) => {
    const response = await axiosClient.put(`http://localhost:8080/api/v1/areas/${updId}`, JSON.stringify(areaDetail));
    return response;
}

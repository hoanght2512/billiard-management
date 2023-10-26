import { axiosClient } from "@/lib/http/axios-client";

interface areaPayload {
    [x: string]: unknown
  }
  export const findAll = async () => {
    const allArea = await axiosClient.get("http://localhost:8080/api/v1/areas")
    return allArea;
  }
  export const areaById = async (editId: any) => {
    const areaById = await axiosClient.get(`http://localhost:8080/api/v1/areas/${editId}`);
    return areaById;
  }
  export const addArea = async (areaDetail: areaPayload) => {
    const area = await axiosClient.post("http://localhost:8080/api/v1/areas", JSON.stringify(areaDetail));
    return area;
  }
  export const deleteArea = async (deleteId: any) => {
    const delArea = await axiosClient.delete(`http://localhost:8080/api/v1/areas/${deleteId}`)
    return delArea;
  }
  export const updateArea = async (updId:any, areaDetail: areaPayload) => {
    const updateArea = await axiosClient.put(`http://localhost:8080/api/v1/areas/${updId}`, JSON.stringify(areaDetail));
    return updateArea;
}

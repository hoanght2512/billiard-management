import { axiosClient } from "@/lib/http/axios-client";

interface unitPayload {
    [x: string]: any
  }
  export const findAllUnit = async () => {
    const response = await axiosClient.get("http://localhost:8080/api/v1/units")
    return response;
  }
  export const unitById = async (editId: any) => {
    const response = await axiosClient.get(`http://localhost:8080/api/v1/units/${editId}`);
    return response;
  }
  export const addUnit = async (unitDetail: unitPayload) => {
    const response = await axiosClient.post("http://localhost:8080/api/v1/units", JSON.stringify(unitDetail));
    return response;
  }
  export const deleteUnit = async (deleteId: any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/v1/units/${deleteId}`)
    return response;
  }
  export const updateUnit = async (updId:any, unitDetail: unitPayload) => {
    const response = await axiosClient.put(`http://localhost:8080/api/v1/units/${updId}`, JSON.stringify(unitDetail));
    return response;
}

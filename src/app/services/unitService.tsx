import { axiosClient } from "@/lib/http/axios-client";

interface unitPayload {
    [x: string]: unknown
  }
  export const findAll = async () => {
    const allUnit = await axiosClient.get("http://localhost:8080/api/v1/units")
    return allUnit;
  }
  export const unitById = async (editId: any) => {
    const unitById = await axiosClient.get(`http://localhost:8080/api/v1/units/${editId}`);
    return unitById;
  }
  export const addUnit = async (unitDetail: unitPayload) => {
    const unit = await axiosClient.post("http://localhost:8080/api/v1/units", JSON.stringify(unitDetail));
    return unit;
  }
  export const deleteUnit = async (deleteId: any) => {
    const delUnit = await axiosClient.delete(`http://localhost:8080/api/v1/units/${deleteId}`)
    return delUnit;
  }
  export const updateUnit = async (updId:any, unitDetail: unitPayload) => {
    const updateUnit = await axiosClient.put(`http://localhost:8080/api/v1/units/${updId}`, JSON.stringify(unitDetail));
    return updateUnit;
}

import { axiosClient } from "@/lib/http/axios-client";

interface areaPayload {
    [x: string]: any
  }
  export const findAllArea = async () => {
    const response = await axiosClient.get("https://beevengers-171751ae310c.herokuapp.com/api/v1/area")
    return response;
  }
  export const areaById = async (areaId: any) => {
    const response = await axiosClient.get(`https://beevengers-171751ae310c.herokuapp.com/api/v1/area/findbyid?areaId=${areaId}`);
    return response;
  }
  export const addArea = async (areaDetail: areaPayload) => {
    const response = await axiosClient.post("https://beevengers-171751ae310c.herokuapp.com/api/v1/area/manager", JSON.stringify(areaDetail));
    return response;
  }
  export const deleteArea = async (deleteId: any) => {
    const response = await axiosClient.delete(`https://beevengers-171751ae310c.herokuapp.com/api/v1/area/manager/${deleteId}`)
    return response;
  }
  export const updateArea = async (updId:any, areaDetail: areaPayload) => {
    const response = await axiosClient.put(`https://beevengers-171751ae310c.herokuapp.com/api/v1/area/manager/${updId}`, JSON.stringify(areaDetail));
    return response;
}

import { axiosClient } from "@/lib/http/axios-client";

interface roomPayload {
    [x: string]: any
  }
  export const findAllRoomProduct = async (roomId: any) => {
    const response = await axiosClient.get(`https://beevengers-171751ae310c.herokuapp.com/api/v1/roomproducts?roomId=${roomId}`)
    return response;
  }
//   export const roomById = async (roomId: any) => {
//     const response = await axiosClient.get(`https://beevengers-171751ae310c.herokuapp.com/api/v1/rooms/findbyid?roomId=${roomId}`);
//     return response;
//   }
//   export const roomByAreaId = async (areaId: any) => {
//     const response = await axiosClient.get(`https://beevengers-171751ae310c.herokuapp.com/api/v1/rooms/findbyarea?areaId=${areaId}`);
//     return response;
//   }
  export const addRoomProduct = async (roomProduct: roomPayload) => {
    const response = await axiosClient.post("https://beevengers-171751ae310c.herokuapp.com/api/v1/roomproducts", JSON.stringify(roomProduct));
    return response;
  }
  export const deleteRoomProduct = async (deleteId: any) => {
    const response = await axiosClient.delete(`https://beevengers-171751ae310c.herokuapp.com/api/v1/roomproducts/deletebyid/${deleteId}`);
    return response;
  }
  export const deleteAllByRoom = async (deleteId: any) => {
    const response = await axiosClient.delete(`https://beevengers-171751ae310c.herokuapp.com/api/v1/roomproducts/deletebyroomid/${deleteId}`);
    return response;
  }
  export const updateRoomProduct = async (updId:any,roomProduct: roomPayload) => {
    const response = await axiosClient.put(`https://beevengers-171751ae310c.herokuapp.com/api/v1/roomproducts/${updId}`, JSON.stringify(roomProduct));
    return response;
}

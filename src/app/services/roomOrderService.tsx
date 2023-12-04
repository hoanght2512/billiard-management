import { axiosClient } from "@/lib/http/axios-client";

interface roomOrderPayload {
    [x: string]: any
  }
  export const findRoomOrderID = async (roomOrderID: any) => {
    const response = await axiosClient.get(`http://localhost:8080/api/v1/restaurant/findbyroomid?roomId=${roomOrderID}`)
    return response;
  }
  export const addRoomOrder = async (roomOrderDetail: roomOrderPayload) => {
    const response = await axiosClient.post(`http://localhost:8080/api/v1/restaurant`, JSON.stringify(roomOrderDetail));
    return response;
  }
  export const deleteRoomOrder = async (deleteId: any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/v1/restaurant/${deleteId}`);
    return response;
  }
  export const updateRoomOrder = async (updId:any,roomOrderDetail: roomOrderPayload) => {
    const response = await axiosClient.put(`http://localhost:8080/api/v1/restaurant/${updId}`, JSON.stringify(roomOrderDetail));
    return response;
  }
  export const changeRoomOrder = async (roomId:any,newRoomId: any) => {
    const response = await axiosClient.put(`http://localhost:8080/api/v1/restaurant/changeroom?currentRoomId=${roomId}&toRoomId=${newRoomId}`);
    return response;
  }
  export const checkoutRoomOrder = async (roomId:any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/v1/restaurant/checkout/${roomId}`);
    return response;
  }
  export const startRoomProduct = async (roomId:any) => {
    const response = await axiosClient.post(`http://localhost:8080/api/v1/restaurant/start?roomId=${roomId}`);
    return response;
  }
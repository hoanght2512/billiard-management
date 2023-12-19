import { axiosClient } from "@/lib/http/axios-client";

interface roomOrderPayload {
    [x: string]: any
  }
  // export const findRoomOrderID = async (roomOrderID: any) => {
  //   const response = await axiosClient.get(`https://beevengers-171751ae310c.herokuapp.com/api/v1/restaurant/findbyroomid?roomId=${roomOrderID}`)
  //   return response;
  // }
  export const addRoomOrder = async (roomOrderDetail: roomOrderPayload) => {
    const response = await axiosClient.post(`https://beevengers-171751ae310c.herokuapp.com/api/v1/restaurant`, JSON.stringify(roomOrderDetail));
    return response;
  }
  export const deleteRoomOrder = async (deleteId: any) => {
    const response = await axiosClient.delete(`https://beevengers-171751ae310c.herokuapp.com/api/v1/restaurant/${deleteId}`);
    return response;
  }
  export const deleteHuyTra = async (roomOrderDetail: roomOrderPayload) => {
    const response = await axiosClient.delete(
      "https://beevengers-171751ae310c.herokuapp.com/api/v1/restaurant",
      {
        data: JSON.stringify(roomOrderDetail),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  };
  export const updateRoomOrder = async (roomOrderDetail: roomOrderPayload) => {
    const response = await axiosClient.put(`https://beevengers-171751ae310c.herokuapp.com/api/v1/restaurant`, JSON.stringify(roomOrderDetail));
    return response;
  }
  export const changeRoomOrder = async (roomId:any,newRoomId: any) => {
    const response = await axiosClient.put(`https://beevengers-171751ae310c.herokuapp.com/api/v1/restaurant/cashier/changeroom?currentRoomId=${roomId}&toRoomId=${newRoomId}`);
    return response;
  }
  export const checkoutRoomOrder = async (roomId:any) => {
    const response = await axiosClient.delete(`https://beevengers-171751ae310c.herokuapp.com/api/v1/restaurant/cashier/checkout/${roomId}`);
    return response;
  }
  export const startRoomProduct = async (roomId:any) => {
    const response = await axiosClient.post(`https://beevengers-171751ae310c.herokuapp.com/api/v1/restaurant/start?roomId=${roomId}`);
    return response;
  }
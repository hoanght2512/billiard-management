import { axiosClient } from "@/lib/http/axios-client";

interface orderPayload {
    [x: string]: any
  }
  // export const findAllOrder = async () => {
  //   const response = await axiosClient.get("https://beevengers-171751ae310c.herokuapp.com/api/v1/orders")
  //   return response;
  // }
  export const findAllOrder = async (
    from: any,
    to: any
  ) => {
    const response = await axiosClient.get(
      `https://beevengers-171751ae310c.herokuapp.com/api/v1/invoice`,
      {
        params: {
          from: from, // adjust the parameter name based on your backend API
          to: to,
        },
      }
    );
    return response;
  };
  export const orderById = async (orderId: any) => {
    const response = await axiosClient.get(`https://beevengers-171751ae310c.herokuapp.com/api/v1/invoice/findbyid?orderId=${orderId}`);
    return response;
  }
  export const addOrder = async (orderDetail: orderPayload) => {
    const response = await axiosClient.post("https://beevengers-171751ae310c.herokuapp.com/api/v1/invoice", JSON.stringify(orderDetail));
    return response;
  }
  export const deleteOrder = async (deleteId: any) => {
    const response = await axiosClient.delete(`https://beevengers-171751ae310c.herokuapp.com/api/v1/invoice/${deleteId}`)
    return response;
  }
  export const updateOrder = async (updId:any, orderDetail: orderPayload) => {
    const response = await axiosClient.put(`https://beevengers-171751ae310c.herokuapp.com/api/v1/invoice/${updId}`, JSON.stringify(orderDetail));
    return response;
}

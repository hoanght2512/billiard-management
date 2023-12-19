import { axiosClient } from "@/lib/http/axios-client";

// interface orderDetailPayload {
//     [x: string]: any
//   }
export const findAllByOrderId = async (orderId: any) => {
  const response = await axiosClient.get(
    `https://beevengers-171751ae310c.herokuapp.com/api/v1/orderdetails?order=${orderId}`
  );
  return response;
};

export const findOrderDetailByDate = async (from: any, to: any) => {
  const response = await axiosClient.get(
    `https://beevengers-171751ae310c.herokuapp.com/api/v1/orders/findbydate`,
    {
      params: {
        from: from, // adjust the parameter name based on your backend API
        to: to,
      },
    }
  );
  return response;
};

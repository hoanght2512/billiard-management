import { axiosClient } from "@/lib/http/axios-client";

// interface orderDetailPayload {
//     [x: string]: any
//   }
export const findAllByOrderId = async (orderId: any) => {
  const response = await axiosClient.get(
    `http://localhost:8080/api/v1/orderdetails?order=${orderId}`
  );
  return response;
};

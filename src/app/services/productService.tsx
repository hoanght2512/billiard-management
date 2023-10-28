import { axiosClient } from "@/lib/http/axios-client";
export const findAll = async () => {
    const response = await axiosClient.get("http://localhost:8080/api/v1/products")
    return response;
  }
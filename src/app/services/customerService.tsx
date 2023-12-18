import { axiosClient } from "@/lib/http/axios-client";

interface customerPayload {
    [x: string]: any
  }
  export const findAllCustomer = async () => {
    const response = await axiosClient.get("http://localhost:8080/api/v1/customer")
    return response;
  }
  export const customerById = async (customerId: any) => {
    const response = await axiosClient.get(`http://localhost:8080/api/v1/customer/findbyid?customerId=${customerId}`);
    return response;
  }
  export const addCustomer = async (customerDetail: customerPayload) => {
    const response = await axiosClient.post("http://localhost:8080/api/v1/customer/manager", JSON.stringify(customerDetail));
    return response;
  }
  export const deleteCustomer = async (deleteId: any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/v1/customer/manager/${deleteId}`)
    return response;
  }
  export const updateCustomer = async (updId:any, customerDetail: customerPayload) => {
    const response = await axiosClient.put(`http://localhost:8080/api/v1/customer/manager/${updId}`, JSON.stringify(customerDetail));
    return response;
  }

import { axiosClient } from "@/lib/http/axios-client";
import { saveStorage } from "@/utils/storage";

interface userPayload{
  [x: string]: any
}
 export const findAllUser = async () => {
  const response = await axiosClient.get("https://beevengers-171751ae310c.herokuapp.com/api/v1/user")
  return response;
}
export const userById = async (editId: any) => {
  const response = await axiosClient.get(`https://beevengers-171751ae310c.herokuapp.com/api/v1/user/findbyid?userId=${editId}`);
  return response;
}
export const addUser = async (userDetail: userPayload) => {
  const response = await axiosClient.post("https://beevengers-171751ae310c.herokuapp.com/api/v1/user/manager", JSON.stringify(userDetail));
  return response;
}
export const deleteUser = async (deleteId: any) => {
  const response = await axiosClient.delete(`https://beevengers-171751ae310c.herokuapp.com/api/v1/user/manager/${deleteId}`)
  return response;
}
export const updateUser = async (updId:any, userDetail: userPayload) => {
  const response = await axiosClient.put(`https://beevengers-171751ae310c.herokuapp.com/api/v1/user/manager/${updId}`, JSON.stringify(userDetail));
  return response;
}

import { axiosClient } from "@/lib/http/axios-client";
import { saveStorage } from "@/utils/storage";

interface LoginPayload {
  [x: string]: any
}
interface SignupPayload{
  [x: string]: any
}

interface userPayload{
  [x: string]: any
}

export const login = async (loginDetail: LoginPayload) => {    
    const response = await axiosClient.post("http://localhost:8080/api/auth/signin", JSON.stringify(loginDetail));
    // @ts-ignore 
    if (response.status === true) {
      // @ts-ignore 
      saveStorage('access_token', response.token);
    } else{
      console.log(response);
    }
    return response;
  
 };
 export const signup = async(signupDetail: SignupPayload) => {
    const response = await axiosClient.post("http://localhost:8080/api/auth/signup", JSON.stringify(signupDetail));
    return response;
 }

 export const findAllUser = async () => {
  const response = await axiosClient.get("http://localhost:8080/api/v1/users")
  return response;
}
export const userById = async (editId: any) => {
  const response = await axiosClient.get(`http://localhost:8080/api/v1/users/${editId}`);
  return response;
}
export const addUser = async (userDetail: userPayload) => {
  const response = await axiosClient.post("http://localhost:8080/api/v1/users", JSON.stringify(userDetail));
  return response;
}
export const deleteUser = async (deleteId: any) => {
  const response = await axiosClient.delete(`http://localhost:8080/api/v1/users/${deleteId}`)
  return response;
}
export const updateUser = async (updId:any, userDetail: userPayload) => {
  const response = await axiosClient.put(`http://localhost:8080/api/v1/users/${updId}`, JSON.stringify(userDetail));
  return response;
}

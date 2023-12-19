import { axiosClient } from "@/lib/http/axios-client";
import { saveStorage } from "@/utils/storage";

interface LoginPayload {
  [x: string]: any
}

export const login = async (loginDetail: LoginPayload) => {    
    const response = await axiosClient.post("https://beevengers-171751ae310c.herokuapp.com/api/v1/auth/login", JSON.stringify(loginDetail));
    // @ts-ignore 
    if (response.tokenType === "Bearer") {
      // @ts-ignore 
      saveStorage('access_token', response.accessToken);
    } else{
      console.log(response);
    }
    return response;
 };

import { axiosClient } from "@/lib/http/axios-client";
import { saveStorage } from "@/utils/storage";

interface LoginPayload {
  [x: string]: unknown
}
interface SignupPayload{
  [x: string]: unknown
}

export const login = async (loginDetail: LoginPayload) => {    
    const user = await axiosClient.post("http://localhost:8080/api/auth/signin", JSON.stringify(loginDetail));
    // @ts-ignore 
    if (user.status === true) {
      // @ts-ignore 
      saveStorage('access_token', user.token);
    } else{
      console.log(user)
    }
    return user
  
 };
 export const signup = async(signupDetail: SignupPayload) => {
    const signup = await axiosClient.post("http://localhost:8080/api/auth/signup", JSON.stringify(signupDetail));
    return signup
 }

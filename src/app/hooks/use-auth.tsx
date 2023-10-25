import { axiosClient } from "@/lib/http/axios-client"
import useSWR from "swr"

export const useAuth = () => {
    const { data,error, ...otherResult } = useSWR('/auth/me', url => {
        return axiosClient.get(url)
    })
    // const { data:userRoles} = useSWR('/auth/me/role', url => {
    //     return axiosClient.get(url)
    // })
    return {
        ...otherResult,
        // userRoles,
        data, 
        error,
        isLoading: !data && !error,
    }
}
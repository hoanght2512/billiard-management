import { axiosClient } from "@/lib/http/axios-client";
export const onGetHistory = async () => {
  const response = await axiosClient.get(
    "https://beevengers-171751ae310c.herokuapp.com/api/v1/history"
  );
  return response;
};

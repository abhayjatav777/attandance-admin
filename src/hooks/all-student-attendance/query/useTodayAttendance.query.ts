import { useQuery } from "react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const get = async (params: TAttendanceParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_TODAY_ATTENDANCE,
    method: "GET",
    params: {
      ...params.paging,
      date: params.date,
    },
  });
  return response;
};

export const useTodayAttendanceQuery = (params: TAttendanceParams) => {
  return useQuery(["get-today-attendance", params], () => get(params), {
    keepPreviousData: true,
  });
};

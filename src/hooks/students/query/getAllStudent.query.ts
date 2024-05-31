import { useQuery } from "react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const getAllStudent = async (params: TQueryParams & { blocked: boolean }) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_ALL_STUDENT,
    method: "GET",
    params: {
      ...params.paging,
      search: params.searchParams?.search,
      searchFieldNumber: ["mobile"],
      searchFieldString: ["name", "email"],
      blocked: params.blocked,
    },
  });
  return response;
};

export const useGetAllStudent = (
  params: TQueryParams & { blocked: boolean }
) => {
  return useQuery(["admin", "all-student", params], () =>
    getAllStudent(params)
  );
};

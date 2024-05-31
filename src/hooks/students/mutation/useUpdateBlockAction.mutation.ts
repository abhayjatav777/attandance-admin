import { useMutation } from "react-query";
import { apiUrls } from "../../api-urls";
import { TStudentValues } from "../../../form/initial-value/addStudent.values";
import { request } from "../../../services/axios.service";

const updateStudent = async (data: Pick<TStudentValues, "_id">) => {
  const response: TServerResponse = await request({
    url: apiUrls.UPDATE_BLOCK_STATUS,
    method: "POST",
    data: data,
  });
  return response;
};

export const useUpdateBlockActionMutation = () => {
  return useMutation(updateStudent);
};

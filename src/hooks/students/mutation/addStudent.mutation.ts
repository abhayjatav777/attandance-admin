import { useMutation } from "react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

import { TStudentValues } from "../../../form/initial-value/addStudent.values";

const AddStudent = async (data: TStudentValues) => {
  const response: TServerResponse = await request({
    url: apiUrls.ADDSTUDENT,
    method: "POST",
    data: data,
  });
  return response;
};

export const useAddStudentMutation = () => {
  return useMutation(AddStudent);
};

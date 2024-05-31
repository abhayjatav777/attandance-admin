import { showNotification } from "@mantine/notifications";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { deleteAllCookies } from "./getCookies.service";

const client = axios.create({ baseURL: `${process.env.REACT_APP_SERVER}` });

export const request = async (options: AxiosRequestConfig<any>) => {
  const token = localStorage.getItem("token");
  client.defaults.headers.common.authorization = `Bearer ${token}`;

  const onSuccess = (response: AxiosResponse) => response.data;
  const onError = (error: any) => {
    if (error.response.status === 401) {
      deleteAllCookies();
      window.location.replace("/login");
      showNotification({
        message: "Session expired please login again",
        color: "red",
      });
    } else if (error.response.status >= 500) {
      showNotification({
        title: error.response?.data?.title,
        message: error.response?.data?.message,
        color: "red",
      });
    }

    return { ...error.response.data, data: [] };
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

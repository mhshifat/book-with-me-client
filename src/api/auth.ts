import { sendRequest } from "../helpers/index";

export const Auth = {
  register: async (data: any) => sendRequest("post", "/register", data),
  login: async (data: any) => sendRequest("post", "/login", data),
};

import Axios from "axios";
import { LoginPayload } from "./types";

const SERVER_URL = "http://localhost:8080";

const axios = Axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
});

export const login = async (
  email: string,
  password: string
): Promise<LoginPayload> => {
  const data = await axios.post("/api/login", {
    email,
    password,
  });
  return data.data;
};

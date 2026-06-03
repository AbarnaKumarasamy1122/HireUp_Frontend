import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const registerUser = async (data: any) => {
  return axios.post(`${API}/api/users/register/`, data);
};
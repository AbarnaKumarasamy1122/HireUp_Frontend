import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// REGISTER
export const registerUser = async (data: any) => {
  return axios.post(
    `${API}/api/users/register/`,
    data
  );
};

// LOGIN
export const loginUser = (email: string, password: string) => {
  return axios.post(`${API}/api/users/login/`, {
    email,
    password,
  });
};

// SEND OTP
export const sendOTP = (email: string) => {
  return axios.post(`${API}/api/users/send-otp/`, {
    email,
  });
};

// RESET PASSWORD
export const resetPassword = (
  email: string,
  otp: string,
  new_password: string
) => {
  return axios.post(`${API}/api/users/reset-password/`, {
    email,
    otp,
    new_password,
  });
};
import axios from "axios";
import { API_BASE } from "../utils/api";

const API = API_BASE;

// IMAGEKIT AUTH
export const getImageKitAuth = async () => {
  return axios.get(`${API}/api/imagekit-auth/`);
};

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

// ADMIN PROFILE
export const getAdminProfile = async (id: number) => {
  return axios.get(`${API_BASE}/api/users/admin-profile/${id}/`);
};

export const updateAdminProfile = async (id: number, data: any) => {
  return axios.put(`${API_BASE}/api/users/update-admin-profile/${id}/`, data);
};


// GET PENDING COMPANIES
export const getPendingCompanies = async () => {

  return axios.get(
    `${API}/api/users/pending-companies/`
  );
};


// APPROVE COMPANY
export const approveCompany = async (id: number) => {
  return axios.put(`${API}/api/users/approve-company/${id}/`);
};

// REJECT COMPANY
export const rejectCompany = async (id: number) => {
  return axios.put(`${API}/api/users/reject-company/${id}/`);
};

// GET ALL COMPANIES (ADMIN)
export const getAllCompanies = async () => {
  return axios.get(`${API}/api/users/all-companies/`);
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


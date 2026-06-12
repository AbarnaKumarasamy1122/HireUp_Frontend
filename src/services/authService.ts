import api from "../utils/api";


// IMAGEKIT AUTH
export const getImageKitAuth = async () => {
  return api.get("/api/imagekit-auth/");
};

// REGISTER
export const registerUser = async (data: any) => {
  return api.post(
    "/api/users/register/",
    data
  );
};

// LOGIN
export const loginUser = (email: string, password: string) => {
  return api.post("/api/users/login/", {
    email,
    password,
  });
};

// ADMIN PROFILE
export const getAdminProfile = async (id: number) => {
  return api.get(`/api/users/admin-profile/${id}/`);
};

export const updateAdminProfile = async (id: number, data: any) => {
  return api.put(`/api/users/update-admin-profile/${id}/`, data);
};


// GET PENDING COMPANIES
export const getPendingCompanies = async () => {

  return api.get(
    "/api/users/pending-companies/"
  );
};


// APPROVE COMPANY
export const approveCompany = async (id: number) => {
  return api.put(`/api/users/approve-company/${id}/`);
};

// REJECT COMPANY
export const rejectCompany = async (id: number) => {
  return api.put(`/api/users/reject-company/${id}/`);
};

// GET ALL COMPANIES (ADMIN)
export const getAllCompanies = async () => {
  return api.get(`/api/users/all-companies/`);
};

// SEND OTP
export const sendOTP = (email: string) => {
  return api.post("/api/users/send-otp/", {
    email,
  });
};

export const verifyOTP = (email: string, otp: string) => {
  return api.post("/api/users/verify-otp/", {
    email,
    otp,
  });
};

// RESET PASSWORD
export const resetPassword = (
  email: string,
  otp: string,
  new_password: string
) => {
  return api.post("/api/users/reset-password/", {
    email,
    otp,
    new_password,
  });
};

export const getCompanyProfile = (id: number) => {
  return api.get(`/api/users/${id}/company-profile/`);
};

export const getCandidateProfile = (id: number) => {
  return api.get(`/api/users/${id}/candidate-profile/`);
};

// JOBS
export const createJob = (data: any) => {
  return api.post("/api/jobs/post-job/", data);
};

export const getCompanyJobs = (id: number) =>
  api.get(`/api/jobs/jobs/${id}/`);

export const getJobDetail = (id: number) =>
  api.get(`/api/jobs/job/${id}/`);

export const updateJob = (id: number, data: any) =>
  api.put(`/api/jobs/update-job/${id}/`, data);

export const deleteJob = (id: number) =>
  api.delete(`/api/jobs/delete-job/${id}/`);

export const getAllJobs = () =>
  api.get("/api/jobs/all-jobs/");

// APPLICATIONS
export const getCompanyApplications = (id: number) =>
  api.get(`/api/applications/company/${id}/`);

// ANALYTICS
export const getCompanyAnalytics = (id: number) =>
  api.get(`/api/companies/analytics/${id}/`);
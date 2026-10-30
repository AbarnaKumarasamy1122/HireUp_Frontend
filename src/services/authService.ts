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

export const getAdminDashboard = async () => {
  return api.get("/api/users/admin-dashboard/");
};

export const getAdminNotifications = async () =>
  api.get("/api/notifications/admin-notifications/");

export const getAdminContactMessages = async () =>
  api.get("/api/users/admin-contact-messages/");

export const getPublicStatistics = async () => {
  return api.get("/api/users/public-statistics/");
};

export const sendContactMessage = (data: {
  name: string;
  email: string;
  message: string;
}) => api.post("/api/users/contact/", data);

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

export const updateCompanyProfile = (id: number, data: {
  first_name: string;
  last_name: string;
  company_name: string;
  company_address: string;
  company_contact: string;
  company_website: string;
  company_description: string;
  profile_image: string;
}) => api.put(`/api/users/${id}/company-profile/`, data);

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
  api.get(`/api/applications/company-applications/${id}/`);

// ANALYTICS
export const getCompanyAnalytics = (id: number) =>
  api.get(`/api/companies/analytics/${id}/`);


export const getCandidateProfile = (id: number) => {
  return api.get(`/api/users/${id}/candidate-profile/`);
};

export const updateCandidateProfile = (id: number, data: {
  first_name: string;
  last_name: string;
  profile_image: string;
}) => api.put(`/api/users/${id}/candidate-profile/`, data);

// APPLICATIONS
export const applyJob = (data: any) =>
  api.post("/api/applications/apply-job/", data);

export const getMyApplications = () =>
  api.get("/api/applications/candidate-applications/");

// NOTIFICATIONS
export const getMyNotifications = () =>
  api.get("/api/notifications/my-notifications/");

// SAVED JOBS
export const getSavedJobs = () =>
  api.get("/api/saved-jobs/my-saved-jobs/");

export const saveJob = (job_id: number) =>
  api.post("/api/saved-jobs/save-job/", { job_id });

export const removeSavedJob = (job_id: number) =>
  api.delete(`/api/saved-jobs/remove-saved-job/${job_id}/`);

export const getAppliedJobIds = () =>
  api.get("/api/applications/applied-job-ids/");

export const getSavedJobIds = () =>
  api.get("/api/saved-jobs/saved-job-ids/");

// RESUME UPDATE
export const updateResume = (id: number, resume_url: string) =>
  api.put(`/api/users/update-resume/${id}/`, { resume_url });

// SHORTLIST CANDIDATE
export const shortlistCandidate = (
  applicationId: number
) =>
  api.put(
    `/api/applications/shortlist-candidate/${applicationId}/`
  );


// REJECT CANDIDATE
export const rejectCandidate = (
  applicationId: number
) =>
  api.put(
    `/api/applications/reject-candidate/${applicationId}/`
  );


// ACCEPT CANDIDATE
export const acceptCandidate = (
  applicationId: number
) =>
  api.put(
    `/api/applications/accept-candidate/${applicationId}/`
  );

// SCHEDULE INTERVIEW
export const scheduleInterview = (
  data: {
    application_id: number;
    scheduled_at: string;
    meeting_link: string;
  }
) =>
  api.post(
    "/api/interviews/schedule-interview/",
    data
  );

export const updateInterview = (
  id: number,
  data: {
    scheduled_at: string;
    meeting_link: string;
  }
) =>
  api.put(
    `/api/interviews/update-interview/${id}/`,
    data
  );


// COMPANY INTERVIEWS
export const getCompanyInterviews = () =>
  api.get(
    "/api/interviews/company-interviews/"
  );


// CANDIDATE INTERVIEWS
export const getMyInterviews = () =>
  api.get(
    "/api/interviews/my-interviews/"
  );


// COMPLETE INTERVIEW
export const completeInterview = (
  id: number
) =>
  api.put(
    `/api/interviews/complete-interview/${id}/`
  );
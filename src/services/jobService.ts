import axios from "axios";

const API = "http://127.0.0.1:8000/api/jobs/";

export const getJobs = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createJob = async (data: any) => {
  const res = await axios.post(API, data);
  return res.data;
};
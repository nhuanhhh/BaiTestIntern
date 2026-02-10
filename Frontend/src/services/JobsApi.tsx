import { api } from "./api";

export const getJobs = async () => {
  const { data } = await api.get("/jobs");
  return data;
};

export const getApplications = async (jobId: string) => {
  const { data } = await api.get(`/jobs/${jobId}/applications`);
  return data;
};

export const updateStatus = async (id: string, status: string) => {
  await api.put(`/applications/${id}/status`, { status });
};

export const deleteApplication = async (id: string) => {
  await api.delete(`/applications/${id}`);
};
export const updateCandidateStatus = async ( candidateId: string, status: string) => {
  const { data } = await api.put(`/applications/${candidateId}/status`, { status });
  return data;
};
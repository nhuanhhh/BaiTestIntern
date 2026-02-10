// src/services/recruitmentService.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllJobs = async () => {
  return await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
    include: { applications: true } 
  });
};


export const getApplicationsByJobId = async (jobId) => {
  return await prisma.application.findMany({
    where: { jobId: jobId },
    orderBy: { createdAt: 'desc' }
  });
};


export const updateApplicationStatus = async (id, status) => {
  return await prisma.application.update({
    where: { id },
    data: { status }
  });
};


export const deleteApplication = async (id) => {
  return await prisma.application.delete({
    where: { id }
  });
};


export const createJob = async (data) => {
  return await prisma.job.create({ data });
};
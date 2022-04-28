import { AppState } from "../AppState.js";
import { Job } from "../models/Job.js";
import { api } from "./AxiosService.js";

class JobsService
{
    async addJob(newJobData)
    {
        const res = await api.post('api/jobs', newJobData);
        return res.data;
    }

    async getAllJobs()
    {
        const res = await api.get("api/jobs");
        AppState.jobs = res.data.map(v => new Job(v));
    }

    async getJobById(id)
    {
        const res = await api.get("api/jobs/" + id);
        AppState.job = new Job(res.data);
    }

    async editJob(jobData)
    {
        const res = await api.put("api/jobs/" + jobData.id, jobData);
        AppState.job = new Job(res.data);
    }

    async deleteJob(id)
    {
        await api.delete("api/jobs/" + id);
    }
}

export const jobsService = new JobsService();
import { AppState } from "../AppState.js";
import { Job } from "../models/Job.js";
import { api } from "./AxiosService.js";

class JobsService
{
    async addJob(newJobData)
    {
        const res = await api.post('jobs', newJobData);
        return res.data;
    }

    async getAllJobs()
    {
        const res = await api.get("jobs");
        AppState.jobs = res.data.map(v => new Job(v));
    }

    async getJobById(id)
    {
        const res = await api.get("jobs/" + id);
        AppState.job = new Job(res.data);
    }

    async editJob(jobData)
    {
        const res = await api.put("jobs/" + jobData.id, jobData);
        AppState.job = new Job(res.data);
    }

    async deleteJob(id)
    {
        await api.delete("jobs/" + id);
    }
}

export const jobsService = new JobsService();
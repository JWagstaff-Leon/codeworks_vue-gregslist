<template>
    <div class="col-xl-3 col-lg-4 col-md-6 py-2 job-listing no-select action" @click="openJobDetails(job.id)">
            <div class="card rounded-4 bg-dark text-light h-100">
                <div class="card-body d-flex flex-column">
                    <h4 class="card-title">{{job.jobTitle}} at {{job.company}}</h4>
                    <h5 class="card-subtitle">{{job.hours}} hours at ${{job.rate}}/hour</h5>
                    <div class="card-text">{{job.description}}</div>
                </div>
            </div>
        </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { Job } from "../models/Job.js";
export default
{
    props:
    {
        job:
        {
            type: Job,
            required: true
        }
    },

    setup()
    {
        const router = useRouter();
        return {
            async openJobDetails(id)
            {
                router.push( {name: "JobDetails", params: { id }} );
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.job-listing
{
    min-height: 20vh;
}
</style>
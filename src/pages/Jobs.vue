<template>
    <div class="container-fluid">
        <div class="row">
            <Job v-for="j in jobs" :key="j.id" :job="j" />
        </div>
    </div>
    <button class="btn btn-primary fab rounded-circle" data-bs-toggle="modal" data-bs-target="#new-job-modal" title="Create Job Listing">➕</button>
    <Modal id="new-job-modal">
        <template #modal-header-slot>
            <h4>New Job Listing</h4>
        </template>
        <template #modal-body-slot>
            <JobForm />
        </template>
    </Modal>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { jobsService } from "../services/JobsService.js";
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default
{
    async mounted()
    {
        try
        {
            AppState.job = null;
            await jobsService.getAllJobs();
        }
        catch(error)
        {
            logger.error("[JOBS COMPONENT > MOUNTED]", error.message);
            Pop.toast(error.message, "error");
        }
    },

    setup()
    {
        const jobs = computed(() => AppState.jobs);
        const job = computed(() => AppState.job);
        return {
            jobs,
            job
        }
    }
}
</script>

<style lang="scss" scoped>
.fab
{
    position: fixed;
    bottom: 3vh;
    right: 3vh;
    height: 6vh;
    width: 6vh;

    z-index: 1;

    border: 2px solid #00000060;
}
</style>
<template>
    <div v-if="job" class="position-relative">
        <button class="btn back-button selectable py-2" @click="back()"><i class="mdi mdi-arrow-left"></i> Back to Jobs</button>
        <div class="container">
            <div class="row mt-3">
                <div class="col-8 offset-2">
                    <div class="d-flex flex-column align-items-center">
                        <h4 class="my-2">{{job.description}}</h4>
                        <div class="d-flex flex-column">
                            <h2 class="mb-0 mt-3">Job offer from {{job.company}} as a {{job.jobTitle}}</h2>
                            <h3>Making ${{job.rate}}/hour</h3>
                            <h5 class="fst-italic text-dark lighten-20 mt-0">{{job.hours}} hours/week</h5>
                        </div>
                        <div class="d-flex justify-content-between">
                            <i class="mdi mdi-pencil selectable" data-bs-toggle="modal" data-bs-target="#edit-job-modal" ></i>
                            <i class="mdi mdi-delete selectable" @click="deleteJob()"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal id="edit-job-modal" v-if="job">
        <template #modal-title-slot>
            <h3>Edit Job Listing</h3>
        </template>
        <template #modal-body-slot>
            <JobForm :job="job" />
        </template>
    </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router'
import { jobsService } from '../services/JobsService.js'
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
export default
{
    async mounted()
    {
        try
        {
            const route = useRoute();
            await jobsService.getJobById(route.params.id);
        }
        catch(error)
        {
            logger.error("[JOB DETAILS > MOUNTED]", error.message);
            Pop.toast(error.message, "error");
        }
    },

    setup()
    {
        const job = computed(() => AppState.job);
        const route = useRoute();
        const router = useRouter();
        return {
            job,
            back()
            {
                router.push({ name: "Jobs" });
            },
            async deleteJob()
            {
                if(await Pop.confirm())
                {
                    await jobsService.deleteJob(route.params.id);
                    router.push({ name: "Jobs" });
                    Pop.toast("Job successfully deleted", "success");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
img
{
    height: 40vh;
}

.back-button
{
    top: 0;
    left: 0;
    position: absolute;
}
</style>
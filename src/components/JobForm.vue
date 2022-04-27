<template>
    <form @submit.prevent="submitHandler()">
        <div class="mb-3 d-flex justify-content-between">
            <div>
            <label for="jobTitle" class="form-label">Job Title</label>
            <input type="text" class="form-control" name="jobTitle" id="jobTitle" aria-describedby="jobTitle"
                placeholder="Job Title..." required v-model="editable.jobTitle">
            </div>
            <div>
            <label for="rate" class="form-label">Hourly Rate</label>
            <input type="number" class="form-control" name="rate" id="rate" aria-describedby="rate"
                placeholder="Hourly Rate..." min="0" required v-model="editable.rate">
            </div>
        </div>
        <div class="mb-3 d-flex justify-content-between">
            <div class="mx-1">
            <label for="hours" class="form-label">Hours</label>
            <input type="number" class="form-control" name="hours" id="hours" aria-describedby="hours"
                placeholder="Hours..." required v-model="editable.hours">
            </div>
            <div class="mx-1">
            <label for="company" class="form-label">Company Name</label>
            <input type="text" class="form-control" name="company" id="company" aria-describedby="company"
                placeholder="Company Name..." required v-model="editable.company">
            </div>
        </div>
        <div class="mb-3">
            <div>
            <label for="description" class="form-label">Description</label>
            <textarea type="text" class="form-control" name="description" id="description"
                aria-describedby="description" placeholder="No description given." min="5" max="250" required v-model="editable.description"></textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-if="job.id" type="submit" class="btn btn-primary">Edit</button>
            <button v-else type="submit" class="btn btn-primary">Create</button>
        </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { Job } from '../models/Job.js'
import { jobsService } from '../services/JobsService.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js'
export default
{
    props:
    {
        job:
        {
            type: Job,
            default: () => new Job()
        }
    },

    setup(props)
    {
        const editable = ref({});
        const router = useRouter();

        watchEffect(() => {
            editable.value = { ...props.job };
        });

        return {
            editable,
            async submitHandler()
            {
                try
                {
                    if(editable.value.id)
                    {
                        await jobsService.editJob(editable.value);
                        Pop.toast("Job successfully edited", "success");
                        Modal.getOrCreateInstance(document.getElementById("edit-job-modal")).hide();
                    }
                    else
                    {
                        const res = await jobsService.addJob(editable.value);
                        router.push({ name: "JobDetails", params: {id: res.data.id }})
                        Pop.toast("Job successfully created", "success");
                        Modal.getOrCreateInstance(document.getElementById("new-job-modal")).hide();
                    }
                }
                catch(error)
                {
                    logger.error("[JOB FORM > SUBMIT HANDLER]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
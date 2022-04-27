<template>
    <form @submit.prevent="submitHandler()">
        <div class="mb-3">
                <label for="year" class="form-label">Year</label>
                <input type="number" class="form-control" name="year" id="year" aria-describedby="year"
                    placeholder="Year..." min="1" required v-model="editable.year">
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" class="form-control" name="price" id="price" aria-describedby="price"
                    placeholder="Price..." min="1" required v-model="editable.price">
            </div>
            <div class="mb-3 d-flex justify-content-between">
            <div class="mx-1">
            <label for="bedrooms" class="form-label">Bedrooms</label>
            <input type="number" class="form-control" name="bedrooms" id="bedrooms" aria-describedby="bedrooms"
                placeholder="Bedrooms..." min="1" required v-model="editable.bedrooms">
            </div>
            <div class="mx-1">
            <label for="bathrooms" class="form-label">Bathrooms</label>
            <input type="number" class="form-control" name="bathrooms" id="bathrooms" aria-describedby="bathrooms" placeholder="Bathrooms..." min="1" required v-model="editable.bathrooms">
            </div>
            <div class="mx-1">
            <label for="levels" class="form-label">Floors</label>
            <input type="number" class="form-control" name="levels" id="levels" aria-describedby="levels"
                placeholder="Floors..." min="1" required v-model="editable.levels">
            </div>
        </div>
        <div class="mb-3 d-flex justify-content-between">
            <div>
            <label for="imgUrl" class="form-label">Image Url</label>
            <input type="url" class="form-control" name="imgUrl" id="imgUrl" aria-describedby="imgUrl"
                placeholder="Image Url..." required v-model="editable.imgUrl">
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
            <button v-if="house.id" type="submit" class="btn btn-primary">Edit</button>
            <button v-else type="submit" class="btn btn-primary">Create</button>
        </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { House } from '../models/House.js'
import { housesService } from '../services/HousesService.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js'
export default
{
    props:
    {
        house:
        {
            type: House,
            default: () => new House()
        }
    },

    setup(props)
    {
        const editable = ref({});
        const router = useRouter();

        watchEffect(() => {
            editable.value = { ...props.house };
        });

        return {
            editable,
            async submitHandler()
            {
                try
                {
                    if(editable.value.id)
                    {
                        await housesService.editHouse(editable.value);
                        Pop.toast("House successfully edited", "success");
                        Modal.getOrCreateInstance(document.getElementById("edit-house-modal")).hide();
                    }
                    else
                    {
                        const newHouse = await housesService.addHouse(editable.value);
                        router.push({ name: "HouseDetails", params: {id: newHouse.id }})
                        Pop.toast("House successfully created", "success");
                        Modal.getOrCreateInstance(document.getElementById("new-house-modal")).hide();
                    }
                }
                catch(error)
                {
                    logger.error("[HOUSE FORM > SUBMIT HANDLER]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
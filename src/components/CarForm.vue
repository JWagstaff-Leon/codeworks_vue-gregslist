<template>
    <form @submit.prevent="submitHandler()">
      <div class="mb-3 d-flex justify-content-between">
        <div>
          <label for="make" class="form-label">Make</label>
          <input type="text" class="form-control" name="make" id="make" aria-describedby="make"
            placeholder="Make..." required v-model="editable.make">
        </div>
        <div>
          <label for="model" class="form-label">Model</label>
          <input type="text" class="form-control" name="model" id="model" aria-describedby="model"
            placeholder="Model..." required v-model="editable.model">
        </div>
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <div class="mx-1">
          <label for="year" class="form-label">Year</label>
          <input type="number" class="form-control" name="year" id="year" aria-describedby="year"
            placeholder="Year..." min="1950" max="2022" required v-model="editable.year">
        </div>
        <div class="mx-1">
          <label for="price" class="form-label">Price</label>
          <input type="number" class="form-control" name="price" id="price" aria-describedby="price"
            placeholder="Price..." min='1' required v-model="editable.price">
        </div>
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <div class="">
          <label for="imgUrl" class="form-label">Image Url</label>
          <input type="url" class="form-control" name="imgUrl" id="imgUrl" aria-describedby="imgUrl"
            placeholder="Image Url..." required  v-model="editable.imgUrl">
        </div>
        <div class="mx-1 flex-grow-1">
          <label for="color" class="form-label">Color</label>
          <input type="color" class="form-control h-100" name="color" id="color" aria-describedby="color" required v-model="editable.color">
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
        <button v-if="car.id" type="submit" class="btn btn-primary">Edit</button>
        <button v-else type="submit" class="btn btn-primary">Create</button>
      </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { Car } from '../models/Car.js'
import { carsService } from '../services/CarsService.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js'
export default
{
    props:
    {
        car:
        {
            type: Car,
            default: () => new Car()
        }
    },

    setup(props)
    {
        const editable = ref({});
        const router = useRouter();

        watchEffect(() => {
            editable.value = { ...props.car };
        });

        return {
            editable,
            async submitHandler()
            {
                try
                {
                    if(editable.value.id)
                    {
                        await carsService.editCar(editable.value);
                        Pop.toast("Car successfully edited", "success");
                        Modal.getOrCreateInstance(document.getElementById("edit-car-modal")).hide();
                    }
                    else
                    {
                        const newCar = await carsService.addCar(editable.value);
                        router.push({ name: "CarDetails", params: {id: newCar.id }})
                        Pop.toast("Car successfully created", "success");
                        Modal.getOrCreateInstance(document.getElementById("new-car-modal")).hide();
                    }
                }
                catch(error)
                {
                    logger.error("[CAR FORM > SUBMIT HANDLER]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
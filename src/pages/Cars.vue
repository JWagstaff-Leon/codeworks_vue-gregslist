<template>
    <div class="container-fluid">
        <div class="row">
            <Car v-for="c in cars" :key="c.id" :car="c" />
        </div>
    </div>
    <button v-if="account.id" class="btn btn-primary fab rounded-circle" data-bs-toggle="modal" data-bs-target="#new-car-modal" title="Create Car Listing">➕</button>
    <Modal id="new-car-modal">
        <template #modal-header-slot>
            <h4>New Car Listing</h4>
        </template>
        <template #modal-body-slot>
            <CarForm />
        </template>
    </Modal>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { carsService } from "../services/CarsService.js";
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default
{
    async mounted()
    {
        try
        {
            AppState.car = null;
            await carsService.getAllCars();
        }
        catch(error)
        {
            logger.error("[CARS COMPONENT > MOUNT > GET ALL CARS]", error.message);
            Pop.toast(error.message, "error");
        }
    },

    setup()
    {
        const cars = computed(() => AppState.cars);
        const car = computed(() => AppState.car);
        const account = computed(() => AppState.account);
        return {
            cars,
            car,
            account
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
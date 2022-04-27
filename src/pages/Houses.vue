<template>
    <div class="container-fluid">
        <div class="row">
            <House v-for="h in houses" :key="h.id" :house="h" />
        </div>
    </div>
    <button class="btn btn-primary fab rounded-circle" data-bs-toggle="modal" data-bs-target="#new-house-modal" title="Create House Listing">➕</button>
    <Modal id="new-house-modal">
        <template #modal-header-slot>
            <h4>New House Listing</h4>
        </template>
        <template #modal-body-slot>
            <HouseForm />
        </template>
    </Modal>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { housesService } from "../services/HousesService.js";
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default
{
    async mounted()
    {
        try
        {
            AppState.house = null;
            await housesService.getAllHouses();
        }
        catch(error)
        {
            logger.error("[HOUSES COMPONENT > MOUNTED]", error.message);
            Pop.toast(error.message, "error");
        }
    },

    setup()
    {
        const houses = computed(() => AppState.houses);
        const house = computed(() => AppState.house);
        return {
            houses,
            house
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
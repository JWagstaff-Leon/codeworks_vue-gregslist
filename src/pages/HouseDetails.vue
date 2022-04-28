<template>
    <div v-if="house" class="position-relative">
        <button class="btn back-button selectable py-2" @click="back()"><i class="mdi mdi-arrow-left"></i> Back to Houses</button>
        <div class="container">
            <div class="row mt-3">
                <div class="col-8 offset-2">
                    <div class="d-flex flex-column align-items-center">
                        <img :src="house.imgUrl" />
                        <div v-if="house.creatorID === account.id" class="d-flex justify-content-between">
                            <i class="mdi mdi-pencil selectable" data-bs-toggle="modal" data-bs-target="#edit-house-modal" ></i>
                            <i class="mdi mdi-delete selectable" @click="deleteHouse()"></i>
                        </div>
                        <h2>{{house.levels}} floor<span v-if="house.levels !== 1">s</span>, built in {{house.year}}</h2>
                        <h2 class="mb-0">{{house.bedrooms}} bedroom, {{house.bathrooms}} bath</h2>
                        <h5 class="fst-italic text-dark lighten-20 mt-0">${{house.price}}</h5>
                        <h4 class="mt-2">{{house.description}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal id="edit-house-modal" v-if="house">
        <template #modal-title-slot>
            <h3>Edit House Listing</h3>
        </template>
        <template #modal-body-slot>
            <HouseForm :house="house" />
        </template>
    </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router'
import { housesService } from '../services/HousesService.js'
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
            await housesService.getHouseById(route.params.id);
        }
        catch(error)
        {
            logger.error("[HOUSE DETAILS > MOUNTED]", error.message);
            Pop.toast(error.message, "error");
        }
    },

    setup()
    {
        const house = computed(() => AppState.house);
        const account = computed(() => AppState.account);
        const route = useRoute();
        const router = useRouter();
        return {
            house,
            account,
            back()
            {
                router.push({ name: "Houses" });
            },
            async deleteHouse()
            {
                if(await Pop.confirm())
                {
                    await housesService.deleteHouse(route.params.id);
                    router.push({ name: "Houses" });
                    Pop.toast("House successfully deleted", "success");
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
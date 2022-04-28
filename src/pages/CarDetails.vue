<template>
    <div v-if="car" class="position-relative">
        <button class="btn back-button selectable py-2" @click="back()"><i class="mdi mdi-arrow-left"></i> Back to Cars</button>
        <div class="container">
            <div class="row mt-3">
                <div class="col-8 offset-2">
                    <div class="d-flex flex-column align-items-center">
                        <img :src="car.imgUrl" />
                        <div v-if="car.creatorID === account.id" class="d-flex justify-content-between">
                            <i class="mdi mdi-pencil selectable" data-bs-toggle="modal" data-bs-target="#edit-car-modal" ></i>
                            <i class="mdi mdi-delete selectable" @click="deleteCar()"></i>
                        </div>
                        <h2 class="mb-0">{{car.year}} {{car.make}} {{car.model}}</h2>
                        <h5 class="fst-italic text-dark lighten-20 mt-0">${{car.price}}</h5>
                        <h4 class="mt-2">{{car.description}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal id="edit-car-modal" v-if="car">
        <template #modal-title-slot>
            <h3>Edit Car Listing</h3>
        </template>
        <template #modal-body-slot>
            <CarForm :car="car" />
        </template>
    </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router'
import { carsService } from '../services/CarsService.js'
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
            await carsService.getCarById(route.params.id);
        }
        catch(error)
        {
            logger.error("[CAR DETAILS > MOUNTED]", error.message);
            Pop.toast(error.message, "error");
        }
    },

    setup()
    {
        const car = computed(() => AppState.car);
        const account = computed(() => AppState.account)
        const route = useRoute();
        const router = useRouter();
        return {
            car,
            account,
            back()
            {
                router.push({ name: "Cars" });
            },
            async deleteCar()
            {
                if(await Pop.confirm())
                {
                    await carsService.deleteCar(route.params.id);
                    router.push({ name: "Cars" });
                    Pop.toast("Car successfully deleted", "success");
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
<template>
    <div class="col-xl-3 col-lg-4 col-md-6 py-2 car-listing action" @click="openCarDetails(car.id)">
        <div class="card rounded-4 p-2">
            <img :src="car.imgUrl" class="card-img-top mb-1">
            <div class="card-body" :style="'border: 3px solid' + car.color">
                <h4 class="card-title">{{ car.year }} {{ car.make }} {{ car.model }}</h4>
                <h5 class="card-subtitle">${{ car.price }}</h5>
                <div class="card-text">{{ car.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { Car } from "../models/Car.js";
export default
{
    props:
    {
        car:
        {
            type: Car,
            required: true
        }
    },

    setup()
    {
        const router = useRouter();
        return {
            async openCarDetails(id)
            {
                router.push( {name: "CarDetails", params: { id }} );
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.car-listing
{
    max-height: 65vh;
}

.car-listing .card
{
    height: 100%;
}

.car-listing img
{
    height: 25vh;
    object-fit: cover;
}

.car-listing .car-text
{
    overflow-y: auto;
}
</style>
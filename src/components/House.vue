<template>
    <div class="col-xl-3 col-lg-4 col-md-6 py-2 house-listing action" @click="openHouseDetails(house.id)">
        <div class="card rounded-4 h-100">
            <img :src="house.imgUrl" class="card-img-top house-image h-100">
            <div class="card-img-overlay text-light d-flex align-items-end">
                <div class="house-text-box p-2">
                    <h4 class="card-title">{{house.levels}} {{house.levels == 1 ? "floor" : "floors"}} house built in {{house.year}}</h4>
                    <h5 class="card-subtitle">{{house.bedrooms}}bd {{house.bathrooms}}ba for ${{Math.ceil(house.price / 1000)}}k</h5>
                    <div class="card-text">{{house.description}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { House } from "../models/House.js";
export default
{
    props:
    {
        house:
        {
            type: House,
            required: true
        }
    },

    setup()
    {
        const router = useRouter();
        return {
            async openHouseDetails(id)
            {
                router.push( {name: "HouseDetails", params: { id }} );
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.house-listing
{
    height: 30vh;
}

.house-image
{
    filter: blur(0.9px);
    object-fit: cover;
}
.house-text-box
{
    border-radius: 5px;
    background-color: rgba(30, 30, 30, 0.8);
}
</style>
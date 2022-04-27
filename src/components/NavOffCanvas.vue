<template>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="listings-menu">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title">Gregs'List</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body p-0 mt-4">
            <ul class="list-group list-group-flush">
                <router-link :to="{ name: 'Cars' }"><button class="list-group-item list-group-item-action" @click="navigate('Cars')">Afforable Cars</button></router-link>
                <router-link :to="{ name: 'Houses' }"><button class="list-group-item list-group-item-action" @click="navigate('Houses')">Modern Homes</button></router-link>
                <router-link :to="{ name: 'Jobs' }"><button class="list-group-item list-group-item-action" @click="navigate('Jobs')">Competitive Jobs</button></router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import { Offcanvas } from 'bootstrap'
import { useRouter } from 'vue-router'
export default
{
    setup()
    {
        return {
            navigate(name)
            {
                Offcanvas.getOrCreateInstance(document.getElementById("listings-menu")).hide()
                useRouter().push({name})
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
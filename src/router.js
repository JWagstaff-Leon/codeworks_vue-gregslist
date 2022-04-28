import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/cars',
    name: 'Cars',
    component: loadPage('Cars')
  },
  {
    path: "/cars/:id",
    name: "CarDetails",
    component: loadPage("CarDetails")
  },
  {
    path: '/houses',
    name: 'Houses',
    component: loadPage('Houses')
  },
  {
    path: '/houses/:id',
    name: 'HouseDetails',
    component: loadPage('HouseDetails')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: loadPage('Jobs')
  },
  {
    path: '/jobs/:id',
    name: 'JobDetails',
    component: loadPage('JobDetails')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

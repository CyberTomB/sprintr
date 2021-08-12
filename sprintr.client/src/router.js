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
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/projects',
    name: 'ProjectList',
    component: loadPage('ProjectListPage'),
    beforeEnter: authGuard
  },
  {
    path: '/projects/:project_id',
    name: 'ProjectDetails',
    component: loadPage('ProjectDetailsPage'),
    children: [{
      path: 'backlog',
      name: 'Backlog',
      component: loadPage('BacklogListPage')
    },
    {
      path: 'backlog/:backlog_id',
      name: 'BacklogItemDetailsPage',
      component: loadPage('BacklogItemDetailsPage')
    }],
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

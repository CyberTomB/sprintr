<template>
  <nav class="navbar navbar-expand-lg nav-style">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }" title="Home">
      <div class="d-flex flex-column align-items-center">
        <img
          alt="logo"
          src="https://i.pinimg.com/originals/c1/3c/c8/c13cc8b2e0c21cf637ec362e1d45718d.jpg"
          height="75"
        />
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
      title="Menu"
    >
      <span class="mdi mdi-menu text-light" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto nav-tabs">
        <li class="nav-item">
          <router-link :to="{ name: 'ProjectList' }" class="nav-link" title="Projects">
            Projects
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'About' }" class="nav-link" title="About">
            About
          </router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-outline-primary text-uppercase"
          title="Login"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
            title="Account Options"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }" title="Account">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
              title="Logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        await AuthService.loginWithPopup()
        router.push({ name: 'ProjectList' })
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.nav-style{
  background-color:#000d2a ;
  color: #d9d9dd;
  border: 1px;
  border-color: #d9d9dd;
  border-style: solid;
}

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: deeppink;
}
</style>

<template>
  <div class="row justify-content-center">
    <div class="col-6 my-4" style="width: 18rem;">
      <img class="card-img-top" :src="account.picture" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">
          {{ account.name }}
        </h5>
        <p class="card-text">
          Runnr User Since: {{ createdDate }}
        </p>
        <router-link :to="{ name: 'ProjectList' }" class="btn btn-primary" title="Projects">
          My Projects
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account),
      createdDate: computed(() => {
        const d = new Date(AppState.account.createdAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      })
    }
  }
}
</script>

<style scoped>
img {
  max-height: 30vh;
  max-width: 30vh;
}
</style>

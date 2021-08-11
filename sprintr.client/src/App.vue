<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container">
      <router-view />
    </div>
  </main>
  <footer>
    <div class="nav-style text-center p-4">
      Made with 🔋 by Tom and Sam
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.nav-style{
  background-color:#000d2a ;
  color: #d9d9dd;
}

</style>

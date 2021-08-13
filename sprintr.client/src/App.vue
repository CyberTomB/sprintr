<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <router-view />
    </div>
  </main>
  <footer class="footer-style">
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
  text-shadow: 2px 2px black;
}

.action {
  cursor: pointer;
}

.footer-style{
  background-color:#000d2a ;
  color: #d9d9dd;
  border: 1px;
  border-color: #d9d9dd;
  border-style: solid;
}

.card a{
  color: #370042;
}

</style>

<template>
  <div id="backlog-list" class="col-7">
    <div v-for="b in backlogItems" :key="b.id">
      <!-- NOTE: This is where the props for the backlogitemcard are being defined (each one is a "b" which is a backlogItem object) -->
      <BacklogItemCard :backlog-item="b" />
      <i class="action mdi mdi-delete text-danger" @click="deleteProject(b.id)"></i>
    </div>
  </div>
  <div class="col-5">
    <form @submit.prevent="createBacklogItem">
      <div class="form-group">
        <label for="backlog-item-name">Backlog Name</label>
        <input type="text"
               class="form-control"
               required
               id="backlog-item-name"
               aria-describedby="backlog-item-name"
               v-model="state.newBacklogItem.name"
        >
      </div>
      <div class="form-group">
        <label for="backlog-item-description">Description</label>
        <textarea class="form-control" required id="backlog-item-description" v-model="state.newBacklogItem.body" />
      </div>
      <div class="form-group">
        <label for="backlog-item-description">Open</label>
        <input type="checkbox" class="form-control" required id="backlog-item-description" v-model="state.newBacklogItem.isOpen" />
      </div>
      <button type="submit" class="btn btn-primary">
        CREATE
      </button>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { backlogsService } from '../services/BacklogsService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newBacklogItem: {
        name: '',
        body: '',
        isOpen: true,
        projectId: route.params.project_id
      }
    })
    onMounted(async() => {
      await backlogsService.getBacklogItemsByProjectId(route.params.project_id)
    })
    return {
      state,
      backlogItems: computed(() => AppState.backlogItems),
      async createBacklogItem() {
        console.log('created')
        await backlogsService.create(state.newBacklogItem)
      },
      async deleteProject(id) {
        await backlogsService.delete(id)
      }
    }
  }
}
</script>

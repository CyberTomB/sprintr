<template>
  <div id="backlog-list" class="col-7" v-if="backlogItems">
    <!-- NOTE: This is where the props for the backlogitemcard are being defined (each one is a "b" which is a backlogItem object) -->
    <BacklogItemCard v-for="b in backlogItems" :key="b.id" :backlog-item="b" />
  </div>
  <div v-else class="col-7">
    <LoaderComponent />
  </div>
  <div class="col-5">
    <div class="text-right">
      <DeleteBtn @delete="deleteProject()" :item-name="'project'">
        <!-- NOTE: This will be inserted in the "slot" on the component -->
        Delete Project
      </DeleteBtn>
    </div>
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
        <input type="checkbox" class="form-control" title="open status" id="backlog-item-description" v-model="state.newBacklogItem.isOpen" />
      </div>
      <button type="submit" class="btn btn-primary" title="create backlog item">
        CREATE
      </button>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { backlogsService } from '../services/BacklogsService'
import { useRoute, useRouter } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
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
        await backlogsService.create(state.newBacklogItem)
        state.newBacklogItem = { projectId: route.params.project_id }
      },
      async deleteProject() {
        await projectsService.delete(route.params.project_id)
        router.push({ name: 'ProjectList' })
      }
    }
  }
}
</script>

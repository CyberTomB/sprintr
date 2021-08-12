<template>
  <div class="row bg-dark align-items-end justify-content-between">
    <h1 @click="projectListPage" class="action m-3">
      Project: {{ project.name }}
    </h1>
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link :class="{active: route.name == 'Backlog'}"
                     class="nav-link"
                     id="backlog-tab"
                     data-toggle="tab"
                     role="tab"
                     :to="{name: 'Backlog', params:{project_id: project.id}}"
        >
          Backlog
        </router-link>
      </li>
      <li class="nav-item" role="presentation" v-for="(sprint) in sprints" :key="sprint.id">
        <router-link
          :class="{active: route.params.sprint_id == sprint.id}"
          class="nav-link"
          id="sprint-tab"
          data-toggle="tab"
          role="tab"
          :to="{name: 'SprintDetailsPage', params:{sprint_id: sprint.id}}"
        >
          {{ sprint.name }}
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link :to="{name: 'SprintFormPage'}">
          <i class="mdi mdi-plus nav-link" id="add-tab" data-toggle="tab" role="tab" :class="{active: route.name == 'SprintFormPage'}"></i>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="row py-3 tab-content" id="router-view">
    <router-view></router-view>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
import { sprintsService } from '../services/SprintsService'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async() => {
      try {
        console.log(route.params.project_id)
        await projectsService.getProjectById(route.params.project_id)
        await sprintsService.getSprintsByProjectId(route.params.project_id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      route,
      project: computed(() => AppState.chosenProject),
      sprints: computed(() => AppState.sprints),
      projectListPage() {
        router.push({ name: 'ProjectList' })
      }
    }
  }
}
</script>

<template>
  <div class="card p-2 my-2">
    <div class="row justify-content-between align-items-end">
      <router-link :to="{name: 'BacklogItemDetailsPage', params: {backlog_id: backlogItem.id}}" class="col-8">
        <h2>
          {{ backlogItem.name }}
        </h2>
      </router-link>
      <div class="col-4 text-right">
        <DeleteBtn @delete="deleteProject(backlogItem.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import { backlogsService } from '../services/BacklogsService'
export default {
  // NOTE: This is where the backlogitemcard knows to receive the prop "b" as an object from the BacklogListPage
  setup() {
    return {
      async deleteProject(id) {
        await backlogsService.delete(id)
      }
    }
  },
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.router-link{
  background-color: red;
}
</style>

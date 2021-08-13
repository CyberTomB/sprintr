<template>
  <div class="">
    <div class="">
      <router-link :to="{name: 'BacklogItemDetailsPage', params: {backlog_id: backlogItem.id}}" class="router-link">
        <h5>
          {{ backlogItem.name }}
        </h5>
      </router-link>
      <DeleteBtn @delete="deleteProject(backlogItem.id)" />
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

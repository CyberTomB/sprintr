<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">
        {{ task.name }}
        Status
      </h4>
      <p class="card-text">
        Assign to:
      </p>
      <!-- <i class="action mdi mdi-delete text-danger" @click="deleteTask(t.id)"></i> -->
    </div>
  </div>

  <!-- TODO: This is what a task object will look like. It must accept task objects as the prop from the BacklogItemDetailsPage to render the unique elements from each task. -->
  <!-- <h3>{{ task.name }}</h3> -->
</template>

<script>
// I hadn't written the props, so it was trying to reference a non-existent object as "task.name" but couldn't, which is why the page wasn't loading.
// NOTE: This is where the backlogitemcard knows to receive the prop "b" as an object from the BacklogListPage
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

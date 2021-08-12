<template>
  <router-link :to="{name: 'BacklogDetailsPage', params: {backlog_id: backlogItem.id}}">
    <h1>{{ backlogItem.name }}</h1>
  </router-link>
</template>

<script>
export default {
  // NOTE: This is where the backlogitemcard knows to receive the prop "b" as an object from the BacklogListPage
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  }
}
</script>

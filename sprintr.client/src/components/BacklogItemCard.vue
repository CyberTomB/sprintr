<template>
  <router-link :to="{name: 'BacklogDetailsPage', params: {backlog_id: backlogItem.id}}">
    <h1>{{ backlogItem.name }}</h1>
  </router-link>
</template>

<script>
export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  }
}
</script>

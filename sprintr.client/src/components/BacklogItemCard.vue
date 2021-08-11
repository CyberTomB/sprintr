<template>
  <h1>{{ backlogItem.name }}</h1>
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

<template>
  <!-- NOTE: This button "emits" a "delete" event when clicked. When using this component, make sure to write an "@delete" property in the parent that handles what this event does -->
  <i class="action mdi mdi-trash-can-outline text-danger btn btn-outline" @click="$emit('delete')" :title="'Delete ' + itemName"><slot></slot></i>
</template>

<script>
export default {
  props: {
    itemName: {
      type: String,
      default: 'item'
    }
  }
}
</script>

<style scoped>
.btn-outline{
  border-color: var(--danger)
}
</style>

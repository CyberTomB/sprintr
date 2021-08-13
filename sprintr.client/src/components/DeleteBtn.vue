<template>
  <!-- NOTE: This button "emits" a "delete" event. When using this component, make sure to write an "@delete" property that handles what this event does -->
  <i class="action mdi mdi-delete-outline text-danger" @click="$emit('delete')" :title="'Delete ' + itemName"></i>
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

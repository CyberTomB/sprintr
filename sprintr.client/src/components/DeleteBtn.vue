<template>
  <!-- NOTE: This button "emits" a "delete" event. When using this component, make sure to write an "@delete" property that handles what this event does -->
  <i class="action mdi mdi-trash-can-outline text-danger btn btn-outline" @click="$emit('delete')" :title="'Delete ' + itemName"></i>
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
  /* REVIEW How do I make this always match danger variable? */
  border-color: #be0059;
}
</style>

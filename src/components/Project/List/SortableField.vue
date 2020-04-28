<template>
  <div class="sortable" @click="$emit('click', field)">
    <div class="field">{{ label }}</div>
    <div class="arrow" v-if="sortCriteria.field === field">
      <i class="material-icons" v-if="sortCriteria.ascending"
        >keyboard_arrow_up</i
      >
      <i class="material-icons" v-else>keyboard_arrow_down</i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SortableField',
  props: { sortCriteria: Object, field: String, label: String },
};
</script>
<style lang="scss" scoped>
.sortable {
  display: flex;
  align-items: center;
  .field,
  .arrow {
    cursor: pointer;
    &:hover {
      color: var(--color-primary-1);
    }
  }
  .material-icons {
    display: flex;
    align-items: center;
    color: var(--color-primary-1);
  }
}
</style>

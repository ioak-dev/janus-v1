<template>
  <div class="toolbar">
    <div>Left</div>
    <ToolbarFilterAndSort />
  </div>
</template>
<script>
import ToolbarFilterAndSort from '../ToolbarFilterAndSort.vue';
export default {
  name: 'Toolbar',
  data: function() {
    return {
      elements: [
        {
          label: 'option one',
          action: () => console.log('option one selected'),
        },
        {
          label: 'option two hih jkl j ilk iji ',
          action: () => console.log('option two selected'),
        },
      ],
    };
  },
  components: {
    ToolbarFilterAndSort,
  },
};
</script>
<style lang="scss" scoped>
.toolbar {
  // height: 60px;
  // line-height: 60px;
  height: 72px;
  line-height: 72px;
  // background-color: var(--color-background-2);
  border-bottom: 1px solid var(--color-background-transparent-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

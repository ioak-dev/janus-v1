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
  height: 36px;
  line-height: 36px;
  background-color: var(--color-body);
  border-bottom: 1px solid var(--color-body-dim);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
</style>

<template>
  <div class="toolbar-filters">
    <OakPopoverMenu
      v-bind:elements="elements"
      data="option 1"
      id="1"
      label="sfdsf dsfa"
      iconLeft="sort"
      theme="primary"
    />
    <OakPopoverMenu
      v-bind:elements="elements"
      data="option 1"
      id="2"
      label="sfd ejf dif i"
      iconRight="assignment_ind"
      theme="primary"
      labelVariant="on"
    />
    <OakPopoverMenu
      v-bind:elements="elements"
      data="option 1"
      id="3"
      label="sfd ejf dif i"
      iconRight="assignment_ind"
      right
    />
  </div>
</template>
<script>
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';
export default {
  name: 'ToolbarFilterAndSort',
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
    OakPopoverMenu,
  },
};
</script>
<style lang="scss" scoped>
.toolbar-filters {
  padding-right: 10px;
  display: flex;
}
</style>

<template>
  <div class="toolbar">
    <OakPopoverMenu
      v-bind:elements="elements"
      data="option 1"
      id="1"
      label="sfdsf dsfa"
      iconLeft="sort"
    />
    <OakPopoverMenu
      v-bind:elements="elements"
      data="option 1"
      id="2"
      label="sfd ejf dif i"
      iconRight="assignment_ind"
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
  name: 'BoardToolbar',
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
.toolbar {
  height: 36px;
  line-height: 36px;
  background-color: var(--color-body);
  border-bottom: 1px solid var(--color-body-dim);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  padding-right: 10px;
}
</style>

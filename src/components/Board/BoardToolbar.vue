<template>
  <div class="toolbar">
    <OakPopoverMenu
      v-bind:elements="elements"
      data="option 1"
      id="1"
      label="sfdsf dsfa"
    >
      <i class="material-icons" slot="left-icon">sort</i>
    </OakPopoverMenu>
    <OakPopoverMenu
      v-bind:elements="elements"
      data="option 1"
      id="2"
      label="sfd ejf dif i"
    >
      <i class="material-icons" slot="right-icon">assignment_ind</i>
    </OakPopoverMenu>
    <OakPopoverMenu
      v-bind:elements="elements"
      data="option 1"
      id="3"
      label="sfd ejf dif i"
      right
    >
      <i class="material-icons" slot="right-icon">assignment_ind</i>
    </OakPopoverMenu>
  </div>
</template>
<script>
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';
export default {
  name: 'BoardToolbar',
  data: function() {
    return {
      elements: ['option 1', 'option 2 ihikjioj '],
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
  border-top: 1px solid var(--color-body-dim);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

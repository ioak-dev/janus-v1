<template>
  <div class="toolbar">
    <div>
      <OakSwitch
        theme="primary"
        v-bind:data="mode"
        v-bind:objects="modes"
        @change="event => $emit('change', event.target.value)"
      />
    </div>
    <div>Right</div>
  </div>
</template>
<script>
import OakSwitch from '@/oakui/OakSwitch.vue';
export default {
  name: 'Toolbar',
  props: {
    mode: String,
    modes: Array,
  },
  components: {
    OakSwitch,
  },
};
</script>
<style lang="scss" scoped>
.toolbar {
  // height: 60px;
  // line-height: 60px;
  height: 50px;
  line-height: 50px;
  // background-color: var(--color-background-1);
  // border-bottom: 1px solid var(--color-background-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

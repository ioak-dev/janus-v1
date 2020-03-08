<template>
  <div class="board">
    <div><vertical-lane category="Selected for Development" /></div>
    <div><vertical-lane category="In progress" /></div>
    <div><vertical-lane category="Complete" /></div>
    <div><vertical-lane category="Complete" /></div>
    <div><vertical-lane category="Complete" /></div>
    <div><vertical-lane category="Complete" /></div>
    <div><vertical-lane category="Complete" /></div>
    <div><vertical-lane category="Complete" /></div>
    <div><vertical-lane category="Selected for Development" /></div>
    <div><vertical-lane category="In progress" /></div>
    <div><vertical-lane category="Complete" /></div>
  </div>
</template>
<script>
import VerticalLane from './VerticalLane.vue';
export default {
  name: 'BoardView',
  components: {
    VerticalLane,
  },
};
</script>
<style lang="scss" scoped>
.board {
  touch-action: none;
  display: flex;
  flex-direction: row;
  //   width: calc(100vw - 100px);
  overflow: auto;
  height: calc(100vh - 60px);
}
</style>

<template>
  <div class="board">
    <div class="board-toolbar"><board-toolbar /></div>
    <div class="board-content">
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
  </div>
</template>
<script>
import VerticalLane from './VerticalLane.vue';
import BoardToolbar from './BoardToolbar.vue';
export default {
  name: 'BoardView',
  components: {
    VerticalLane,
    BoardToolbar,
  },
};
</script>
<style lang="scss" scoped>
.board {
  .board-content {
    touch-action: none;
    display: flex;
    flex-direction: row;
    //   width: calc(100vw - 100px);
    overflow-x: auto;
    overflow-y: scroll;
    height: calc(100vh - 60px);
  }
}
</style>

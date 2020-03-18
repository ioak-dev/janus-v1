<template>
  <div class="board">
    <div class="toolbar-container desktop-only"><Toolbar /></div>
    <div class="board-content">
      <div v-for="stage in getStagesByProjectId()" v-bind:key="stage._id">
        <vertical-lane v-bind:stage="stage" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import VerticalLane from './VerticalLane.vue';
import Toolbar from './Toolbar.vue';
export default {
  name: 'BoardView',
  components: {
    VerticalLane,
    Toolbar,
  },
  computed: {
    ...mapGetters(['getStagesByProjectId']),
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
    // overflow-y: scroll;
    height: calc(100vh - 60px - 36px);
  }
}
</style>

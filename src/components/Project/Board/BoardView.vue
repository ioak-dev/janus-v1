<template>
  <div class="board" v-bind:class="styleClass">
    <!-- <img v-bind:src="getProject.image" />{{ getProject.image }} -->
    <div class="toolbar-container desktop-only" v-bind:class="styleClass">
      <Toolbar />
    </div>
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
    ...mapGetters(['getStagesByProjectId', 'getProject']),
    styleClass: function() {
      if (this.getProject?.image) {
        return 'background-present';
      }
      return 'background-not-present';
    },
  },
  watch: {
    getProject: function() {
      if (this.getProject?.image) {
        document.getElementsByClassName(
          'board'
        )[0].style.background = `url(${this.getProject.image}) no-repeat center center`;
      }
    },
  },
  mounted() {
    if (this.getProject?.image) {
      document.getElementsByClassName(
        'board'
      )[0].style.background = `url(${this.getProject.image}) no-repeat center center`;
    }
  },
};
</script>
<style lang="scss" scoped>
.board {
  &.background-present {
    background-size: cover !important;
  }
  .toolbar-container {
    &.background-not-present {
      background-color: var(--color-background-2);
      border-bottom: 1px solid var(--color-background-1);
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }
    &.background-present {
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
      background-color: var(--color-background-transparent-1);
    }
  }
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

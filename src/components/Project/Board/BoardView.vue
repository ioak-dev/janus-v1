<template>
  <div class="board">
    <div class="board-content">
      <div v-for="stage in getStagesByProjectId()" v-bind:key="stage._id">
        <vertical-lane
          v-bind:stage="stage"
          v-bind:sortCriteria="sortCriteria"
          v-bind:searchCriteria="searchCriteria"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import VerticalLane from './VerticalLane.vue';
import { receiveMessage } from '../../../events/MessageService';
import OakText from '@/oakui/OakText.vue';
export default {
  name: 'BoardView',
  props: { searchCriteria: Object, sortCriteria: Object },
  components: { VerticalLane },
  computed: {
    ...mapGetters(['getStagesByProjectId', 'getProject']),
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
    // overflow-x: auto;
    // overflow-y: scroll;
    // height: calc(100vh - 60px - 36px);
  }
}
</style>

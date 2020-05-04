<template>
  <div class="board">
    <div class="search-bar">
      <OakText
        v-bind:data="searchCriteria.field ? '' : searchCriteria.text"
        label="Type to search"
        @change="handleSearchCriteriaChange"
      />
    </div>
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
  components: { VerticalLane, OakText },
  mounted() {
    receiveMessage().subscribe(message => {
      if (message.name === 'task-filter-change-search') {
        this.searchCriteria = {
          field: message.data.field,
          text: message.data.text,
        };
      } else if (message.name === 'task-filter-change-sort') {
        this.sortCriteria = {
          field: message.data.field,
          ascending: message.data.ascending,
        };
      }
    });
  },
  data: function() {
    return {
      sortCriteria: { field: '', ascending: false },
      searchCriteria: { field: '', text: '' },
    };
  },
  computed: {
    ...mapGetters(['getStagesByProjectId', 'getProject']),
  },
  methods: {
    handleSearchCriteriaChange: function() {
      this.searchCriteria = { field: '', text: event.target.value };
    },
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

<template>
  <div class="list-view">
    <div class="content-container">
      <div class="list-view-header">
        <SortableField
          @click="sort"
          v-bind:sortCriteria="sortCriteria"
          field="taskId"
          label="Task Id"
        />
        <SortableField
          @click="sort"
          v-bind:sortCriteria="sortCriteria"
          field="type"
          label="Type"
        />
        <SortableField
          @click="sort"
          v-bind:sortCriteria="sortCriteria"
          field="epic"
          label="Epic"
        /><SortableField
          @click="sort"
          v-bind:sortCriteria="sortCriteria"
          field="title"
          label="Title"
        />
        <div>Assigned To</div>
        <SortableField
          @click="sort"
          v-bind:sortCriteria="sortCriteria"
          field="priority"
          label="Priority"
        />
      </div>
      <div class="list-view-content">
        <div v-for="stage in getStagesByProjectId()" v-bind:key="stage._id">
          <horizontal-lane
            v-bind:stage="stage"
            v-bind:sortCriteria="sortCriteria"
            v-bind:searchCriteria="searchCriteria"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import OakText from '@/oakui/OakText.vue';
import HorizontalLane from './HorizontalLane.vue';
import SortableField from './SortableField.vue';
import { sendMessage } from '../../../events/MessageService';
export default {
  name: 'ListView',
  components: { HorizontalLane, SortableField },
  props: { searchCriteria: Object, sortCriteria: Object },
  computed: {
    ...mapGetters(['getStagesByProjectId', 'getProject']),
  },
  methods: {
    sort: function(key) {
      if (this.sortCriteria.field === key) {
        this.sortCriteria.ascending = !this.sortCriteria.ascending;
      } else {
        this.sortCriteria = {
          field: key,
          ascending: true,
        };
      }
      sendMessage('request-task-filter-change-sort', true, this.sortCriteria);
    },
    handleSearchCriteriaChange: function() {
      this.searchCriteria = { field: '', text: event.target.value };
      sendMessage(
        'request-task-filter-change-search',
        true,
        this.searchCriteria
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.list-view {
  .toolbar-container,
  .list-view-header,
  .list-view-content {
    background-color: var(--color-background-3);
  }
  display: flex;
  flex-direction: column;
  // height: calc(100vh - 60px - 50px);
  .list-view-header {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid var(--color-background-2);
    display: grid;
    grid-template-columns: 60px 1fr 3fr 1fr 1fr;
  }
  .list-view-content {
    padding: 0 20px;
    overflow-y: auto;
  }

  .list-view-header {
    user-select: none;
    padding: 0 30px;
    display: grid;
    column-gap: 20px;
    grid-template-columns: repeat(6, minmax(25px, 1fr));
    white-space: nowrap;
  }

  .search-container,
  .content-container {
    margin: 20px 20px;
  }

  .content-container {
    overflow-y: auto;
    border-radius: 6px;
    box-shadow: var(--bs-lg);
  }
}
</style>

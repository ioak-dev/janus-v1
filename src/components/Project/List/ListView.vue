<template>
  <div class="list-view">
    <div class="search-container">
      <OakText
        v-bind:data="searchCriteria.field ? '' : searchCriteria.text"
        @change="handleSearchCriteriaChange"
        label="Type to search"
      />
    </div>
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
        <SortableField
          @click="sort"
          v-bind:sortCriteria="sortCriteria"
          field="assignedTo"
          label="Assigned To"
        />
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
import { receiveMessage } from '../../../events/MessageService';
export default {
  name: 'ListView',
  components: { OakText, HorizontalLane, SortableField },
  data: function() {
    return {
      sortCriteria: {
        field: '',
        ascending: true,
      },
      searchCriteria: { field: '', text: '' },
    };
  },
  computed: {
    ...mapGetters(['getStagesByProjectId', 'getProject']),
  },
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
    },
    handleSearchCriteriaChange: function() {
      this.searchCriteria = { field: '', text: event.target.value };
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

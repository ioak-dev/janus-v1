<template>
  <div class="planning" v-bind:class="styleClass">
    <!-- <img v-bind:src="getProject.image" />{{ getProject.image }} -->
    <div class="left">
      <div class="toolbar-container desktop-only" v-bind:class="styleClass">
        <Toolbar @viewTypeChange="switchView" />
      </div>
      <div class="planning-content">
        <ListView
          v-if="view === 'list'"
          v-bind:searchCriteria="searchCriteria"
          v-bind:sortCriteria="sortCriteria"
        />
        <BoardView
          v-if="view === 'board'"
          v-bind:searchCriteria="searchCriteria"
          v-bind:sortCriteria="sortCriteria"
        />
        <SprintView v-if="view === 'sprint'" />
        <TaskView v-if="view === 'task'" v-bind:taskId="selectedRecentTask" />
      </div>
      <div class="toolbar-container mobile-only" v-bind:class="styleClass">
        <Toolbar @viewTypeChange="switchView" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Toolbar from './Toolbar.vue';
import SprintView from './SprintView.vue';
import BoardView from '../Board/BoardView.vue';
import ListView from '../List/ListView.vue';
import TaskView from '../Task/TaskView.vue';
import { receiveMessage, sendMessage } from '../../../events/MessageService';
import { sessionSet, sessionGet } from '../../../events/SessionService';
export default {
  name: 'ProjectDashboard',
  components: {
    Toolbar,
    ListView,
    BoardView,
    SprintView,
    TaskView,
  },
  data: function() {
    return {
      view: '',
      selectedRecentTask: '',
      searchCriteria: {
        field: '',
        text: '',
      },
      sortCriteria: {
        field: '',
        ascending: true,
      },
    };
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
          'planning'
        )[0].style.background = `url(${this.getProject.image}) no-repeat center center`;
      }
    },
  },
  mounted() {
    if (this.getProject?.image) {
      document.getElementsByClassName(
        'planning'
      )[0].style.background = `url(${this.getProject.image}) no-repeat center center`;
    }
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
    ...mapActions(['addTaskToView']),
    switchView: function(view, selectedRecentTask = undefined) {
      this.view = view;
      this.selectedRecentTask = selectedRecentTask;
      if (view === 'task') {
        this.addTaskToView(selectedRecentTask);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.planning {
  &.background-present {
    background-size: cover !important;
  }
  .toolbar-container {
    // &.background-not-present {
    background-color: var(--color-background-2);
    border-bottom: 1px solid var(--color-background-1);
    box-shadow: var(--bs-md);
    // }
    // &.background-present {
    //   box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
    //   background-color: var(--color-background-transparent-5);
    // }
  }
  .planning-content {
    touch-action: none;
    // display: flex;
    // flex-direction: row;
    //   width: calc(100vw - 100px);
    overflow: auto;
    // overflow-y: scroll;
    height: calc(100vh - 60px - 50px);
  }
}
</style>

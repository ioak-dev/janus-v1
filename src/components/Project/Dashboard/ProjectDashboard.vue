<template>
  <div class="planning" v-bind:class="styleClass">
    <!-- <img v-bind:src="getProject.image" />{{ getProject.image }} -->
    <div class="left">
      <div v-bind:class="styleClass">
        <Toolbar
          class="toolbar-container"
          @viewTypeChange="switchView"
          @toggleFilter="toggleFilter"
          :showFilterBar="showFilterBar"
        />
      </div>
      <div class="planning-content">
        <div
          class="filterbar-container"
          v-if="['board', 'list'].includes(view)"
        >
          <Filterbar
            v-bind:class="showFilterBar ? 'show' : 'hide'"
            @viewTypeChange="switchView"
          />
        </div>
        <div
          class="content-container"
          v-bind:class="
            ['board', 'list'].includes(view) && showFilterBar ? 'filter-on' : ''
          "
        >
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
          <EpicList v-if="view === 'epic'" v-bind:epicId="selectedRecentTask" />
          <SprintView v-if="view === 'sprint'" />
          <TaskView v-if="view === 'task'" v-bind:taskId="selectedRecentTask" />
        </div>
      </div>
      <!-- <div class="toolbar-container mobile-only" v-bind:class="styleClass">
        <Toolbar @viewTypeChange="switchView" />
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Toolbar from './Toolbar.vue';
import EpicList from '../Epic/EpicList.vue';
import SprintView from './SprintView.vue';
import BoardView from '../Board/BoardView.vue';
import ListView from '../List/ListView.vue';
import TaskView from '../Task/TaskView.vue';
import Filterbar from './Filterbar.vue';
import { receiveMessage, sendMessage } from '../../../events/MessageService';
import { sessionSet, sessionGet } from '../../../events/SessionService';
export default {
  name: 'ProjectDashboard',
  components: {
    EpicList,
    Toolbar,
    Filterbar,
    ListView,
    BoardView,
    SprintView,
    TaskView,
  },
  data: function() {
    return {
      showFilterBar: false,
      view: '',
      selectedRecentTask: '',
      searchCriteria: [
        {
          field: '',
          text: '',
        },
      ],
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
      if (message.name === 'project-view-updated') {
        this.switchView(message.data.view, message.data.taskId);
      }
      if (message.name === 'task-filter-change-search') {
        this.searchCriteria = message.data;
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
    toggleFilter: function() {
      this.showFilterBar = !this.showFilterBar;
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
  .filterbar-container {
    background-color: var(--color-background-transparent-1);
    .show {
      height: 50px;
      transition: height 0.2s ease-in-out;
      animation: opacity-in 0.2s ease-in-out;
    }
    .hide {
      height: 0;
      overflow: hidden;
      transition: height 0.2s ease-in-out;
    }
  }
  .planning-content {
    .content-container {
      touch-action: none;
      // display: flex;
      // flex-direction: row;
      //   width: calc(100vw - 100px);
      overflow: auto;
      // overflow-y: scroll;
      height: calc(100vh - 60px - 50px);
      transition: height 0.2s ease-in-out;
      &.filter-on {
        height: calc(100vh - 60px - 50px - 50px);
        transition: height 0.2s ease-in-out;
      }
    }
  }
}

@keyframes opacity-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<template>
  <div class="task-filter">
    <div
      class="filter-label"
      v-bind:class="searchCriteriaMap.assignedTo ? 'active' : ''"
      @click="searchAssignedToMe"
    >
      Assigned to me
    </div>
    <div>
      <OakPopoverMenu
        v-bind:elements="typeFilter"
        id="board-view-filter-type"
        right
      >
        <div slot="label" v-if="!searchCriteriaMap.type" class="filter-label">
          Task type
        </div>
        <div slot="label" v-else class="filter-label active">
          {{ `Task type: ${searchCriteriaMap.type}` }}
        </div>
      </OakPopoverMenu>
    </div>
    <div>
      <OakPopoverMenu
        v-bind:elements="sortFields"
        id="board-view-sorting"
        right
      >
        <div slot="label" v-if="!sortCriteria.field" class="filter-label">
          Sort by
        </div>
        <div slot="label" v-else class="filter-label active">
          <OakIcon v-if="sortCriteria.ascending" mat="text_rotation_down" />
          <OakIcon v-else mat="text_rotate_up" />
          {{ `Sort by: ${sortLabels[sortCriteria.field]}` }}
        </div>
      </OakPopoverMenu>
    </div>
  </div>
</template>
<script>
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';
import OakIcon from '@/oakui/OakIcon.vue';
import { sendMessage, receiveMessage } from '../../../events/MessageService';
import { sessionGet, sessionSet } from '../../../events/SessionService';
import { mapGetters } from 'vuex';
export default {
  name: 'TaskFilter',
  data: function() {
    return {
      searchCriteria: [{ field: '', text: '' }],
      sortCriteria: {
        field: '',
        ascending: true,
      },
      sortFields: [
        { label: 'Task Id', action: () => this.sort('taskId') },
        { label: 'Task type', action: () => this.sort('type') },
        { label: 'Epic', action: () => this.sort('epic') },
        { label: 'Title', action: () => this.sort('title') },
        { label: 'Assigned To', action: () => this.sort('assignedTo') },
        { label: 'Priority', action: () => this.sort('priority') },
        { label: 'Clear', action: () => this.sort('') },
      ],
      typeFilter: [
        {
          label: 'Epic',
          action: () => this.search('type', 'Epic'),
          svg: 'epic',
        },
        {
          label: 'Story',
          action: () => this.search('type', 'Story'),
          icon: 'menu_book',
        },
        {
          label: 'Task',
          action: () => this.search('type', 'Task'),
          icon: 'bookmark',
        },
        {
          label: 'Defect',
          action: () => this.search('type', 'Defect'),
          icon: 'bug_report',
        },
        {
          label: 'Sub-task',
          action: () => this.search('type', 'Sub-task'),
          icon: 'book',
        },
        {
          label: 'Clear',
          action: () => this.search('type', ''),
          icon: 'close',
        },
      ],
      sortLabels: {
        taskId: 'Task Id',
        type: 'Task Type',
        epic: 'Epic',
        title: 'Title',
        assignedTo: 'Assigned To',
        priority: 'Priority',
      },
    };
  },
  components: {
    OakIcon,
    OakPopoverMenu,
  },
  mounted() {
    this.loadFiltersFromSession();
    receiveMessage().subscribe(message => {
      if (message.name === 'request-task-filter-change-search') {
        this.search(message.data.field, message.data.text);
      } else if (message.name === 'request-task-filter-change-sort') {
        this.sortCriteria = {
          field: message.data.field,
          ascending: message.data.ascending,
        };
      }
    });
  },
  watch: {
    getProject: function() {
      this.loadFiltersFromSession();
    },
    sortCriteria: function() {
      sessionSet(this.getProject._id, 'taskSortCriteria', this.sortCriteria);
    },
    searchCriteria: {
      deep: true,
      handler() {
        sessionSet(
          this.getProject._id,
          'taskSearchCriteria',
          this.searchCriteria
        );
      },
    },
  },
  computed: {
    ...mapGetters(['getProject', 'getUserByEmail', 'getProfile']),
    searchCriteriaMap: function() {
      const result = {};
      this.searchCriteria.forEach(item => {
        result[item.field] = item.text;
      });
      return result;
    },
    user: function() {
      return this?.getUserByEmail(this?.getProfile?.auth?.email);
    },
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
      sendMessage('task-filter-change-sort', true, this.sortCriteria);
    },
    search: function(field, text) {
      if (!text) {
        this.searchCriteria = this.searchCriteria.filter(
          item => item.field !== field
        );
      } else {
        let update = false;
        this.searchCriteria.forEach(item => {
          if (item.field === field) {
            item.text = text;
            update = true;
          }
        });
        if (!update) {
          this.searchCriteria.push({ field, text });
        }
      }
      sendMessage('task-filter-change-search', true, this.searchCriteria);
    },
    loadFiltersFromSession: function() {
      if (this.getProject) {
        const searchCriteriaFromSession = sessionGet(
          this.getProject._id,
          'taskSearchCriteria'
        );
        if (searchCriteriaFromSession) {
          this.searchCriteria = searchCriteriaFromSession;
          sendMessage(
            'task-filter-change-search',
            true,
            searchCriteriaFromSession
          );
        }
        const sortCriteriaFromSession = sessionGet(
          this.getProject._id,
          'taskSortCriteria'
        );
        if (sortCriteriaFromSession) {
          this.sortCriteria = sortCriteriaFromSession;
          sendMessage('task-filter-change-sort', true, sortCriteriaFromSession);
        }
      }
    },
    searchAssignedToMe: function() {
      if (this.searchCriteria.find(item => item.field === 'assignedTo')) {
        // this.searchCriteria = this.searchCriteria.filter(
        //   item => item.field !== 'assignedTo'
        // );
        this.search('assignedTo', '');
      } else {
        this.search('assignedTo', this.user?._id);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.task-filter {
  display: grid;
  grid-auto-flow: column;
  column-gap: 10px;
  .filter-label {
    cursor: pointer;
    user-select: none;
    padding: 0 10px;
    border-radius: 4px;
    display: flex;
    height: 30px;
    align-items: center;
    &:hover {
      background-color: var(--color-background-4);
    }
    &.active {
      background-color: var(--color-secondary-1);
    }
  }
}
</style>

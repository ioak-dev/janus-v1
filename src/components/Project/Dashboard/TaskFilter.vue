<template>
  <div class="task-filter">
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
    <div>
      <OakPopoverMenu
        v-bind:elements="typeFilter"
        id="board-view-filter-type"
        right
      >
        <div slot="label" v-if="!searchCriteria.field" class="filter-label">
          Task type
        </div>
        <div slot="label" v-else class="filter-label active">
          {{ `Task type: ${searchCriteria.text}` }}
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
      searchCriteria: { field: '', text: '' },
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
          action: () => this.search('', ''),
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
        this.searchCriteria = {
          field: message.data.field,
          text: message.data.text,
        };
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
    searchCriteria: function() {
      sessionSet(
        this.getProject._id,
        'taskSearchCriteria',
        this.searchCriteria
      );
    },
  },
  computed: {
    ...mapGetters(['getProject']),
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
      this.searchCriteria = {
        field,
        text,
      };
      sendMessage('task-filter-change-search', true, this.searchCriteria);
    },
    loadFiltersFromSession: function() {
      console.log('****');
      console.log(this.getProject?._id);
      if (this.getProject) {
        const searchCriteriaFromSession = sessionGet(
          this.getProject._id,
          'taskSearchCriteria'
        );
        console.log(searchCriteriaFromSession);
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
  },
};
</script>
<style lang="scss" scoped>
.task-filter {
  display: grid;
  grid-auto-flow: column;
  column-gap: 10px;
  .filter-label {
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

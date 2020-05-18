<template>
  <div>
    <template v-if="getProject">
      <div class="filterbar" v-bind:key="getProject._id">
        <div class="left">
          <div class="search-bar">
            <OakText
              v-bind:data="searchText"
              label="Type to search"
              @change="handleSearchTextChange"
            />
          </div>
        </div>
        <div class="right desktop-only">
          <TaskFilter v-if="['board', 'list'].includes(page)" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';
import OakText from '@/oakui/OakText.vue';
import TaskFilter from './TaskFilter.vue';
import { sendMessage } from '../../../events/MessageService';
export default {
  name: 'Filterbar',
  components: { TaskFilter, OakText },
  data: function() {
    return {
      searchText: '',
    };
  },
  computed: {
    ...mapGetters([
      'getProfile',
      'getProject',
      'getTaskToView',
      'getTaskByTaskId',
    ]),
    page: function() {
      return this.$route.query.view || 'board';
    },
    recentTasks: function() {
      const elements = [];
      this.getTaskToView.map(item => {
        let icon = '';
        let svg = '';
        switch (this.getTaskByTaskId(item)?.type) {
          case 'Story':
            icon = 'menu_book';
            break;
          case 'Task':
            icon = 'bookmark';
            break;
          case 'Sub-task':
            icon = 'book';
            break;
          case 'Defect':
            icon = 'bug_report';
            break;
          case 'Epic':
            svg = 'epic';
            break;
        }
        elements.push({
          label: item,
          action: () => this.switchToTask(item),
          icon,
          svg,
        });
      });
      return elements;
    },
  },
  watch: {
    page: {
      handler: function(view) {
        if (view === 'task') {
          this.$emit('viewTypeChange', view, this.$route.query.taskid);
        } else {
          this.$emit('viewTypeChange', view);
        }
      },
      immediate: true,
    },
  },
  methods: {
    switchToTask(taskid) {
      this.$emit('viewTypeChange', 'task', taskid);
      this.$router.push({
        path: `/${this.getProfile.space}/${this.getProject._id}/dashboard`,
        query: { view: 'task', taskid },
      });
    },
    handleSearchTextChange: function() {
      this.searchText = event.target.value;
      sendMessage('request-task-filter-change-search', true, {
        field: '',
        text: event.target.value,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.filterbar {
  // height: 60px;
  // line-height: 60px;
  height: 50px;
  line-height: 50px;
  // background-color: var(--color-background-1);
  // border-bottom: 1px solid var(--color-background-1);
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  // justify-content: space-between;
  align-items: center;
  margin: 0 10px;

  .left {
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;

    .search-bar {
      .oak-text-field {
        margin: 0;
      }
    }
  }

  .right {
  }
}
</style>

<template>
  <div>
    <template v-if="getProject">
      <div class="toolbar" v-bind:key="getProject._id">
        <div class="left">
          <!-- <OakSwitch
        theme="primary"
        v-bind:data="mode"
        v-bind:objects="modes"
        @change="event => $emit('change', event.target.value)"
      /> -->
          <router-link
            class="nav-item"
            v-bind:key="`${getProject._id}_board`"
            v-bind:to="
              `/${getProfile.space}/${getProject._id}/dashboard?view=board`
            "
          >
            Board
          </router-link>
          <router-link
            class="nav-item desktop-only"
            v-bind:key="`${getProject._id}_list`"
            v-bind:to="
              `/${getProfile.space}/${getProject._id}/dashboard?view=list`
            "
          >
            List
          </router-link>
          <router-link
            class="nav-item"
            v-bind:key="`${getProject._id}_epic`"
            v-bind:to="
              `/${getProfile.space}/${getProject._id}/dashboard?view=epic`
            "
          >
            Epic
          </router-link>
          <router-link
            v-if="getProject.type === 'Scrum'"
            class="nav-item"
            v-bind:key="`${getProject._id}_sprint`"
            v-bind:to="
              `/${getProfile.space}/${getProject._id}/dashboard?view=sprint`
            "
          >
            Sprint
          </router-link>
          <OakPopoverMenu
            v-if="recentTasks && recentTasks.length > 0"
            v-bind:elements="recentTasks"
            data="option 1"
            id="toolbar-recent-task-switch"
            labelVariant="on"
            theme="primary"
            left
            class="desktop-only"
          >
            <div slot="label">
              <div class="recent-tasks active" v-if="page === 'task'">
                {{ $route.query.taskid || 'Recent' }}
              </div>
              <div class="recent-tasks" v-else>
                Recent
              </div>
            </div>
          </OakPopoverMenu>
        </div>
        <div class="right">
          <div @click="$emit('toggleFilter')" class="filter">
            <OakIcon mat="filter_list" />
            <div>Filter</div>
            <OakIcon
              mat="keyboard_arrow_down"
              v-bind:class="showFilterBar ? 'show' : 'hide'"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';
import TaskFilter from './TaskFilter.vue';
import OakIcon from '@/oakui/OakIcon.vue';
export default {
  name: 'Toolbar',
  props: { showFilterBar: Boolean },
  components: { OakPopoverMenu, OakIcon },
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
  },
};
</script>
<style lang="scss" scoped>
.toolbar {
  // height: 60px;
  // line-height: 60px;
  height: 50px;
  line-height: 50px;
  // background-color: var(--color-background-1);
  // border-bottom: 1px solid var(--color-background-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;

  .left {
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;
    a {
      text-decoration: none;
      color: var(--color-foreground-1);
    }
    .nav-item {
      height: 30px;
      line-height: 30px;
      border-radius: 6px;

      padding: 0 10px;
      &.router-link-exact-active {
        background-color: var(--color-primary-1);
      }
    }
    .recent-tasks {
      height: 30px;
      line-height: 30px;
      border-radius: 6px;

      padding: 0 10px;

      &.active {
        background-color: var(--color-primary-1);
      }
    }
  }

  .right {
    .filter {
      user-select: none;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      border-radius: 6px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      &.active {
        background-color: var(--color-primary-1);
      }

      .show {
        transform: scaleY(-1);
        transition: transform 0.2s ease-in-out;
      }
      .hide {
        transition: transform 0.2s ease-in-out;
      }
    }
  }
}
</style>

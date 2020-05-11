<template>
  <div class="toolbar">
    <div class="left">
      <template v-if="getProject">
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
            `/${getProfile.space}/${getProject._id}/administration?view=team`
          "
        >
          Team
        </router-link>
        <router-link
          class="nav-item"
          v-bind:key="`${getProject._id}_list`"
          v-bind:to="
            `/${getProfile.space}/${getProject._id}/administration?view=administrators`
          "
        >
          Administrators
        </router-link>
        <router-link
          class="nav-item"
          v-bind:key="`${getProject._id}_sprint`"
          v-bind:to="
            `/${getProfile.space}/${getProject._id}/administration?view=background`
          "
        >
          Background
        </router-link>
      </template>
    </div>
    <div>
      <!-- <TaskFilter v-if="['board', 'list'].includes(page)" /> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// import TaskFilter from './TaskFilter.vue';
export default {
  name: 'Toolbar',
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
  }
}
</style>

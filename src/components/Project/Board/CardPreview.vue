<template>
  <div class="card-preview">
    <div class="row-one">
      <div class="left">
        <TaskTypeBadge v-bind:type="task.type" />
        <div class="preview">
          <div class="typography-5">{{ task.taskId }}</div>
        </div>
      </div>
      <div class="right">
        <Avatar v-if="assignedToUser" v-bind:user="assignedToUser" />
      </div>
    </div>
    <div class="row-two">
      <div class="typography-4">
        {{ task.title.length > 100 ? task.title : task.title }}
      </div>
      <!-- .substring(0, 100) + '...' -->
    </div>
    <div class="row-three">
      <div class="left">
        <TaskPriorityBadge v-bind:priority="task.priority" />
        <TaskChildCountBadge v-bind:taskId="task._id" />
        <TaskAttachmentCountBadge v-bind:taskId="task._id" />
        <TaskStatusBadge v-bind:status="task.status" />
      </div>
      <div class="right typography-3">
        Jan 31
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from '@/components/Avatar/Avatar.vue';
import TaskTypeBadge from '../Task/TaskTypeBadge.vue';
import TaskPriorityBadge from '../Task/TaskPriorityBadge.vue';
import TaskStatusBadge from '../Task/TaskStatusBadge.vue';
import TaskChildCountBadge from '../Task/TaskChildCountBadge.vue';
import TaskAttachmentCountBadge from '../Task/TaskAttachmentCountBadge.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'CardPreview',
  props: { task: Object },
  components: {
    Avatar,
    TaskTypeBadge,
    TaskPriorityBadge,
    TaskStatusBadge,
    TaskChildCountBadge,
    TaskAttachmentCountBadge,
  },
  computed: {
    ...mapGetters(['getUserById', 'getSubtasksByTaskId']),
    assignedToUser: function() {
      return this.getUserById(this.task.assignedTo);
    },
  },
};
</script>
<style lang="scss" scoped>
.card-preview {
  display: grid;
  grid-auto-flow: row;
  row-gap: 4px;
  .row-one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left,
    .right {
      display: grid;
      grid-auto-flow: column;
      column-gap: 6px;
      align-items: center;
      .material-icons {
        display: flex;
        align-items: center;
      }
    }
    .left {
    }
    .right {
      .task-status {
        &.complete {
          color: var(--color-success);
        }
      }
    }
  }
  .row-two {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
  .row-three {
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: grid;
      grid-auto-flow: column;
      column-gap: 10px;
      align-items: center;
      .material-icons {
        display: flex;
        align-items: center;
      }
    }
  }
  //   .top-row {
  //     display: grid;
  //     grid-auto-flow: column;
  //     justify-content: flex-start;
  //     .task-type {
  //       color: var(--color-primary-1);
  //     }
  //     .preview {
  //       display: flex;
  //       flex-direction: column;
  //     }
  //   }
  //   .bottom-row {
  //     margin-top: 10px;
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;

  //     .left,
  //     .right {
  //       display: flex;
  //       align-items: center;
  //     }
  //   }
}
</style>

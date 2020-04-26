<template>
  <div class="card-preview">
    <div class="row-one">
      <div class="left">
        <div class="task-type story" v-if="task.type === 'Story'">
          <i class="material-icons">menu_book</i>
        </div>
        <div class="task-type task" v-if="task.type === 'Task'">
          <i class="material-icons">bookmark</i>
        </div>
        <div class="task-type sub-task" v-if="task.type === 'Sub-task'">
          <i class="material-icons">book</i>
        </div>
        <div class="task-type defect" v-if="task.type === 'Defect'">
          <i class="material-icons">bug_report</i>
        </div>
        <div class="preview">
          <div class="typography-5">{{ task.taskId }}</div>
        </div>
      </div>
      <div class="right">
        <div class="task-status complete" v-if="task.status === 'complete'">
          <i class="material-icons">check_circle</i>
        </div>
        <div class="task-status archived" v-if="task.status === 'archived'">
          <i class="material-icons">archive</i>
        </div>
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
        <div
          v-if="getSubtasksByTaskId(task._id).length > 0"
          class="subtask-count"
        >
          <div class="icon"><i class="material-icons">call_merge</i></div>
          <div class="count">
            {{ getSubtasksByTaskId(task._id).length }}
          </div>
        </div>
        <div><Avatar v-if="assignedToUser" v-bind:user="assignedToUser" /></div>
      </div>
      <div class="right typography-3">
        Jan 31
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from '@/components/Avatar/Avatar.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'CardPreview',
  props: { task: Object },
  components: {
    Avatar,
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
      .task-type {
        &.story {
          color: var(--color-warning);
        }
        &.defect {
          color: var(--color-failure);
        }
        &.task,
        &.sub-task {
          color: var(--color-primary-1);
        }
      }
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
      .subtask-count {
        display: flex;
        align-items: center;
        color: var(--color-secondary-1);
        // background-color: var(--color-primary-1);
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

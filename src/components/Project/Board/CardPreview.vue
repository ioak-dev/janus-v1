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
        <template v-for="(member, index) in members">
          <Avatar
            v-if="index < 2"
            v-bind:user="member"
            v-bind:key="member._id"
          />
        </template>
        <div v-if="members.length > 2" class="members-more">
          {{ `+${members.length - 2}` }}
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
        <TaskPriorityBadge v-bind:priority="task.priority" />
        <TaskChildCountBadge v-bind:taskId="task._id" />
        <TaskAttachmentCountBadge v-bind:taskId="task._id" />
        <TaskStatusBadge v-bind:status="task.status" />
      </div>
      <div class="right typography-3">
        <div>Jan 31</div>
        <div
          class="estimate"
          v-if="
            getProject &&
              getProject.estimationMetric === 'Time estimate' &&
              task.timeEstimate > 0
          "
        >
          {{ task.timeEstimate }}
        </div>
        <div
          class="estimate"
          v-if="
            getProject &&
              getProject.estimationMetric === 'Story points' &&
              task.storyPoints > 0
          "
        >
          {{ task.storyPoints }}
        </div>
      </div>
    </div>
    <div class="row-four" v-if="epic">
      <div>
        <EpicBadge v-bind:epic="epic" />
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
import EpicBadge from '../Task/EpicBadge.vue';
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
    EpicBadge,
  },
  computed: {
    ...mapGetters([
      'getUserById',
      'getSubtasksByTaskId',
      'getTaskById',
      'getProject',
    ]),
    assignedToUser: function() {
      return this.getUserById(this.task.assignedTo);
    },
    epic: function() {
      return this.getTaskById(this.task.epic);
    },
    members: function() {
      const memberList = [];
      this.task.assignedTo?.forEach(item =>
        memberList.push(this.getUserById(item))
      );
      return memberList;
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
    .left {
      display: grid;
      grid-auto-flow: column;
      column-gap: 6px;
      align-items: center;
      .material-icons {
        display: flex;
        align-items: center;
      }
    }
    .right {
      display: grid;
      grid-auto-flow: column;
      column-gap: 4px;
      overflow: hidden;
      .members-more {
        border: 1px solid var(--color-foreground-1);
        border-radius: 50%;
        width: 36px;
        height: 36px;
        line-height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8em;
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
    .right {
      display: grid;
      grid-auto-flow: column;
      column-gap: 2px;

      .estimate {
        background-color: var(--color-foreground-5);
        padding: 0 4px;
        border-radius: 4px;
      }
    }
  }
  .row-four {
    display: flex;
    align-items: center;
    justify-content: flex-start;
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

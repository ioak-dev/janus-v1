<template>
  <div class="subtask-row">
    <div class="left">
      <div class="single-row">
        <TaskTypeBadge v-bind:type="subtask.type" />
        <div class="task-id space-left-1" @click="toggleTask">
          {{ subtask.taskId }}
        </div>
      </div>
      <div>{{ subtask.title }}</div>
      <div class="two-liner typography-4">
        {{ toPlainText(subtask.description) }}
      </div>
      <div class="action">
        <div class="action-item" @click="unlink">
          <i class="material-icons">link_off</i>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="members">
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
    <UpdateTask
      @toggle="toggleTask"
      v-bind:visible="editTask"
      v-bind:task="subtask"
      :key="subtask._id"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Avatar from '@/components/Avatar/Avatar.vue';
import TaskTypeBadge from './TaskTypeBadge.vue';
import UpdateTask from '@/components/Project/Task/UpdateTask.vue';
import { htmlToText } from '../../../Utils';
import { sendMessage } from '../../../events/MessageService';
export default {
  name: 'SubtaskRow',
  props: {
    subtask: Object,
  },
  data: function() {
    return {
      editTask: false,
    };
  },
  components: { Avatar, TaskTypeBadge, UpdateTask },
  computed: {
    ...mapGetters(['getUserById', 'getProfile']),
    user: function() {
      return this.getUserById(this.subtask.createdBy);
    },
    members: function() {
      const memberList = [];
      this.subtask.assignedTo?.forEach(item =>
        memberList.push(this.getUserById(item))
      );
      return memberList;
    },
  },
  methods: {
    ...mapActions(['saveTask']),
    unlink: function() {
      this.saveTask({ ...this.subtask, parentTaskId: null });
    },
    toPlainText: function(text) {
      return htmlToText(text);
    },
    toggleTask: function() {
      // console.log(this.subtask.taskId);
      // this.$emit('viewTypeChange', 'task', this.subtask.taskId);
      // sendMessage('project-view-updated', true, {
      //   view: 'task',
      //   taskId: this.subtask.taskId,
      // });
      // this.$router.push({
      //   path: `/${this.getProfile.space}/${this.subtask.projectId}/dashboard`,
      //   query: { view: 'task', taskid: this.subtask.taskId },
      // });
      this.editTask = !this.editTask;
    },
  },
};
</script>
<style lang="scss" scoped>
.subtask-row {
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 4px;
  background-color: var(--color-background-4);
  padding: 10px;
  border-radius: 4px;
  .left {
    display: grid;
    grid-auto-flow: row;
    row-gap: 10px;
    .task-id {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .single-row {
      display: flex;
      align-items: center;
    }
    .action {
      user-select: none;
      display: flex;
      align-items: center;
      display: grid;
      grid-auto-flow: column;
      justify-content: flex-start;
      .action-item {
        cursor: pointer;
        &:hover {
          color: var(--color-primary-1);
        }
      }
    }
  }
  .right {
    .members {
      display: flex;
      align-items: center;
    }
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
</style>

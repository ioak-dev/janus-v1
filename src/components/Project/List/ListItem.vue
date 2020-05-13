<template>
  <div>
    <div
      v-bind:class="dragClass"
      class="list-item"
      @drop.prevent="drop"
      @dragover.prevent="dragOver"
      @dragleave="dragLeave"
      draggable="true"
      @dragstart="dragStart"
      @dragend="dragEnd"
      @click="toggleTask"
    >
      <div class="one-liner" data-test="task-id">{{ task.taskId }}</div>
      <div>
        <TaskTypeBadge v-bind:type="task.type" />
        <div class="one-liner">{{ task.type }}</div>
      </div>
      <div>
        <EpicBadge v-bind:epic="getTaskById(task.epic)" />
      </div>
      <div class="one-liner">{{ task.title }}</div>
      <div>
        <Avatar
          v-for="member in members"
          v-bind:user="member"
          v-bind:key="member._id"
          size="small"
        />
      </div>
      <div>
        <TaskPriorityBadge v-bind:priority="task.priority" />
        <div class="one-liner">{{ task.priority }}</div>
      </div>
    </div>
    <UpdateTask
      v-bind:task="task"
      @toggle="toggleTask"
      v-bind:visible="editTask"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { sendMessage } from '@/events/MessageService';
import UpdateTask from '@/components/Project/Task/UpdateTask.vue';
import Avatar from '@/components/Avatar/Avatar.vue';
import TaskTypeBadge from '../Task/TaskTypeBadge.vue';
import TaskPriorityBadge from '../Task/TaskPriorityBadge.vue';
import EpicBadge from '../Task/EpicBadge.vue';

export default {
  name: 'ListItem',
  components: {
    EpicBadge,
    UpdateTask,
    Avatar,
    TaskTypeBadge,
    TaskPriorityBadge,
  },
  props: {
    task: Object,
  },
  data: function() {
    return {
      editTask: false,
      dragClass: '',
    };
  },
  computed: {
    ...mapGetters(['getUserById', 'getTaskById']),
    members: function() {
      const memberList = [];
      this.task.assignedTo?.forEach(item =>
        memberList.push(this.getUserById(item))
      );
      return memberList;
    },
  },
  methods: {
    ...mapActions(['moveTask', 'moveStage']),
    dragStart(e) {
      this.dragClass = 'source-spot';
      e.dataTransfer.setData('domain', 'task');
      e.dataTransfer.setData('id', this.task._id);
      setTimeout(() => {
        // e.target.style.display = 'none';
      }, 0);
    },
    dragEnd() {
      this.dragClass = '';
      sendMessage('dragging', false);
    },
    dragOver(e) {
      this.dragClass =
        this.dragClass === 'source-spot' ? this.dragClass : 'destination-spot';
    },
    dragLeave(e) {
      this.dragClass =
        this.dragClass === 'destination-spot' ? '' : this.dragClass;
    },
    drop(e) {
      const type = e.dataTransfer.getData('domain');
      const id = e.dataTransfer.getData('id');
      this.dragClass = '';
      if (type === 'task') {
        this.moveTask({ moveTaskId: id, afterTaskId: this.task._id });
      } else if (type === 'stage') {
        this.moveStage({ moveStageId: id, afterStageId: this.task.stageId });
      }
      // const listItem = document.getElementById(id);
      // listItem.style.display = 'block';
      // e.target.appendChild(listItem);
    },
    toggleTask: function() {
      this.editTask = !this.editTask;
    },
  },
};
</script>

<style scoped lang="scss">
.list-item {
  border-bottom: 1px solid var(--color-background-2);
  border-radius: 6px;
  padding: 0 20px;
  height: 36px;
  line-height: 36px;
  // justify-items: flex-start;
  div {
    display: grid;
    grid-auto-flow: column;
    justify-content: flex-start;
    column-gap: 10px;
  }
  cursor: default;
  overflow: hidden;
  .action {
    height: 36px;
    line-height: 36px;
    display: flex;
    align-items: center;
    color: transparent;
    .action-move {
      cursor: grab;
    }
    .action-click {
      cursor: pointer;
    }
  }
  &:hover {
    background-color: var(--color-background-3);
    .action {
      color: var(--color-foreground-1);
      .action-move {
        display: block;
      }
    }
  }
  &.destination-spot {
    background-color: var(--color-tertiary-1);
  }
  &.source-spot {
    background-color: var(--color-background-3);
    border-bottom: 1px solid var(--color-primary-1);
  }
  display: grid;
  grid-template-columns: repeat(6, minmax(25px, 1fr));
  column-gap: 20px;
  .action {
    width: 10px;
  }
}
</style>

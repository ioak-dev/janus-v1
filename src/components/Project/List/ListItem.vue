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
      <div class="one-liner">{{ task.title }}</div>
      <div>
        <Avatar
          v-if="assignedToUser"
          v-bind:user="assignedToUser"
          showName
          size="small"
        />
      </div>
      <div>
        <TaskPriorityBadge v-bind:priority="task.priority" />
        <div class="one-liner">{{ task.priority }}</div>
      </div>
    </div>
    <OakModal
      @close="toggleTask"
      v-bind:visible="editTask"
      label="Quick Edit - Task"
    >
      <div slot="modal-container">
        <UpdateTask v-bind:task="task" />
      </div>
    </OakModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { sendMessage } from '@/events/MessageService';
import UpdateTask from '@/components/Create/UpdateTask.vue';
import Avatar from '@/components/Avatar/Avatar.vue';
import OakModal from '@/oakui/OakModal.vue';
import TaskTypeBadge from '../Task/TaskTypeBadge.vue';
import TaskPriorityBadge from '../Task/TaskPriorityBadge.vue';

export default {
  name: 'ListItem',
  components: {
    OakModal,
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
    ...mapGetters(['getUserById']),
    assignedToUser: function() {
      return this.getUserById(this.task.assignedTo);
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
  grid-template-columns: repeat(5, minmax(25px, 1fr));
  column-gap: 20px;
  .action {
    width: 10px;
  }
}
</style>

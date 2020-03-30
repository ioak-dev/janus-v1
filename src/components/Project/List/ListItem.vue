<template>
  <div>
    <div
      v-bind:class="dragClass"
      class="list-item"
      @drop.prevent="drop"
      @dragover.prevent="dragOver"
      @dragleave="dragLeave"
    >
      <div class="action">
        <i
          class="material-icons action-move"
          draggable="true"
          @dragover.prevent="dragOver"
          @dragstart="dragStart"
          @dragend="dragEnd"
          @dragleave="dragLeave"
          >drag_indicator</i
        >
        <i class="material-icons action-click" @click="toggleTask">edit</i>
      </div>
      <div>{{ task.taskId }}</div>
      <div class="task-title">{{ task.title }}</div>
      <!-- <div>{{ task.assignedTo }}</div> -->
      <div>
        <Avatar v-if="assignedToUser" v-bind:user="assignedToUser" showName />
      </div>
      <div>{{ task.priority }}</div>
    </div>
    <UpdateTask
      @close="toggleTask"
      v-bind:visible="editTask"
      v-bind:task="task"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { sendMessage } from '@/events/MessageService';
import UpdateTask from '@/components/Create/UpdateTask.vue';
import Avatar from '@/components/Avatar/Avatar.vue';
export default {
  name: 'ListItem',
  components: { UpdateTask, Avatar },
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
    ...mapActions(['moveTask']),
    dragStart(e) {
      this.dragClass = 'source-spot';
      e.dataTransfer.setData('id', this.task._id);
      setTimeout(() => {
        // e.target.style.display = 'none';
        console.log('here you can set display as none');
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
      const id = e.dataTransfer.getData('id');
      this.dragClass = '';
      this.moveTask({ moveTaskId: id, afterTaskId: this.task._id });
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
  height: 36px;
  line-height: 36px;
  cursor: default;
  border-bottom: 1px solid var(--color-background-transparent-3);
  display: grid;
  grid-template-columns: 60px 1fr 3fr 1fr 1fr;
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
    background-color: var(--color-background-transparent-3);
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
    background-color: var(--color-background-transparent-3);
    border-bottom: 1px solid var(--color-primary-1);
  }
  display: grid;
  grid-template-columns: 60px repeat(4, minmax(25px, 1fr));
  .action {
    width: 10px;
  }
}
</style>

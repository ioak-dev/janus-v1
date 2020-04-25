<template>
  <div>
    <div v-bind:class="dragClass" class="card">
      <div class="top-row">
        <div class="task-id typography-8">{{ task.taskId }}</div>
        <div class="task-title">{{ task.title }}</div>
      </div>
      <div class="bottom-row">
        <div class="left">
          <div class="task-count">
            {{ getSubtasksByTaskId(task._id).length }}
          </div>
          <Avatar v-if="assignedToUser" v-bind:user="assignedToUser" />
        </div>
        <div class="right typography-3">
          Jan 31
        </div>
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
import { sendMessage } from '@/events/MessageService';
import { mapGetters, mapActions } from 'vuex';
import UpdateTask from '@/components/Create/UpdateTask.vue';
import Avatar from '@/components/Avatar/Avatar.vue';
import OakModal from '@/oakui/OakModal.vue';

export default {
  name: 'Card',
  components: {
    UpdateTask,
    Avatar,
    OakModal,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      editTask: false,
      dragClass: '',
    };
  },
  // watch: {
  //   task: function(newvalue, oldvalue) {
  //     console.log(oldvalue.taskId, newvalue.taskId);
  //   },
  // },
  computed: {
    ...mapGetters(['getProfile', 'getUserById', 'getSubtasksByTaskId']),
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
      if (
        (this.getProfile.sidebar && e.screenX <= 250 + 20) ||
        (!this.getProfile.sidebar && e.screenX <= 20)
      ) {
        sendMessage('dragging');
      }
      if (e.screenX > window.innerWidth * window.devicePixelRatio - 20) {
        sendMessage('dragging');
      }
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
.card {
  cursor: pointer;
  user-select: none;
  padding: 10px;
  background-color: var(--color-background-3);
  // box-shadow: 0 1px 3px 0 var(--color-background-1);
  border-radius: 4px;

  .top-row {
    display: grid;
    grid-template-rows: auto;
    row-gap: 10px;
    .task-id,
    .task-title {
      display: inline;
    }
  }
  .bottom-row {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right {
      display: flex;
      align-items: center;
    }
    .left {
      display: grid;
      grid-auto-flow: column;
      column-gap: 10px;
      .task-count {
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 2px solid var(--color-secondary-1);
      }
    }
  }
}
</style>

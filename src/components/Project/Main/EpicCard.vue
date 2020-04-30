<template>
  <div>
    <div v-bind:class="dragClass" class="card">
      <div class="top-row">
        <div>
          <div class="task-title">{{ task.title }}</div>
          <div class="task-description" v-html="task.description" />
        </div>
        <div><Avatar v-if="assignedToUser" v-bind:user="assignedToUser" /></div>
      </div>
      <div class="bottom-row">
        <div class="header-record">
          <div class="subtask-column">
            Task Id
          </div>
          <div class="subtask-column">Title</div>
          <div class="subtask-column">Another Column</div>
          <div class="subtask-column">Assigned To</div>
        </div>
        <div
          v-for="item in getSubtasksByTaskId(task._id)"
          v-bind:key="item._id"
          class="subtask-record"
        >
          <div class="subtask-column">
            <TaskTypeBadge v-bind:type="item.type" />{{ item.taskId }}
          </div>
          <div class="subtask-column">{{ item.title }}</div>
          <div class="subtask-column">{{ item.title }}</div>
          <div>
            <Avatar
              v-if="getUserById(item.assignedTo)"
              v-bind:user="getUserById(item.assignedTo)"
            />
          </div>
        </div>
      </div>
    </div>
    <OakModal
      @close="toggleTask"
      v-bind:visible="editTask"
      label="Quick Edit - Task"
    >
      <div slot="modal-body">
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
import TaskTypeBadge from '@/components/Project/Task/TaskTypeBadge.vue';

export default {
  name: 'Card',
  components: {
    UpdateTask,
    Avatar,
    OakModal,
    TaskTypeBadge,
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
  padding: 10px;
  background-color: var(--color-background-3);

  display: grid;
  grid-auto-flow: row;
  row-gap: 20px;

  .top-row {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .subtask-record,
  .header-record {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
    padding: 10px;
    border-bottom: 1px solid var(--color-background-5);
    column-gap: 10px;

    .subtask-column {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }

  .header-record {
    border-top: 1px solid var(--color-background-5);
    background-color: var(--color-background-5);
  }
}
</style>

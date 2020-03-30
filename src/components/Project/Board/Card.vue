<template>
  <div>
    <!-- <div class="shadow-card" v-bind:class="shadowCard ? 'show' : 'hide'">
      placehere
    </div> -->
    <div
      v-bind:class="dragClass"
      class="card"
      draggable="true"
      @dragover.prevent="dragOver"
      @dragstart="dragStart"
      @dragend="dragEnd"
      @drop.prevent="drop"
      @click="toggleTask"
      @dragleave="dragLeave"
    >
      <div class="top-row">
        <div class="title typography-5">
          <div class="task-id">{{ task.taskId }}</div>
          <div class="task-title">
            :
            {{
              task.title.length > 100
                ? task.title.substring(0, 100) + '...'
                : task.title
            }}
          </div>
        </div>
      </div>
      <div class="bottom-row">
        <div class="left">
          <Avatar v-if="assignedToUser" v-bind:user="assignedToUser" />
        </div>
        <div class="right typography-6">
          Jan 31
        </div>
      </div>
    </div>
    <UpdateTask
      @close="toggleTask"
      v-bind:visible="editTask"
      v-bind:task="task"
    />
  </div>
</template>

<script>
import { sendMessage } from '@/events/MessageService';
import { mapGetters, mapActions } from 'vuex';
import UpdateTask from '@/components/Create/UpdateTask.vue';
import Avatar from '@/components/Avatar/Avatar.vue';

export default {
  name: 'Card',
  components: {
    UpdateTask,
    Avatar,
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
  computed: {
    ...mapGetters(['getProfile', 'getUserById']),
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
  margin: 0px 8px 8px 0px;
  background-color: var(--color-background-3);
  // box-shadow: 0 1px 3px 0 var(--color-background-1);
  border-radius: 4px;
  // margin-bottom: 10px;
  // border: 1px solid var(--color-primary-1);
  &.destination-spot {
    background-color: var(--color-tertiary-1);
  }
  &.source-spot {
    background-color: var(--color-background-transparent-4);
  }

  .top-row {
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

    .left,
    .right {
      display: flex;
      align-items: center;
    }
  }
}
.shadow-card {
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
}
</style>

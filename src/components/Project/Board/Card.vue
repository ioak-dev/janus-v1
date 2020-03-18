<template>
  <div>
    <!-- <div class="shadow-card" v-bind:class="shadowCard ? 'show' : 'hide'">
      placehere
    </div> -->
    <div
      v-bind:class="dragClass"
      class="card app-content"
      draggable="true"
      @dragover.prevent="dragOver"
      @dragstart="dragStart"
      @dragend="dragEnd"
      @drop.prevent="drop"
      @click="toggleTask"
      @dragleave="dragLeave"
    >
      <div class="title">{{ task.title }}</div>
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

export default {
  name: 'Card',
  components: {
    UpdateTask,
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
    ...mapGetters(['getProfile']),
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
  box-shadow: 0 1px 3px 0 var(--color-body);
  // border-radius: 4px;
  // margin-bottom: 10px;
  // border: 1px solid var(--color-primary);
  &.destination-spot {
    background-color: var(--color-tertiary);
  }
  &.source-spot {
    background-color: var(--color-body-dim);
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

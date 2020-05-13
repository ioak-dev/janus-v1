<template>
  <div>
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
      <CardPreview v-bind:task="task" />
    </div>
    <!-- <OakModal
      @close="toggleTask"
      v-bind:visible="editTask"
      label="Quick Edit - Task"
      v-bind:error="editTaskError"
    >
      <div slot="modal-body"> -->
    <UpdateTask
      @toggle="toggleTask"
      v-bind:visible="editTask"
      v-bind:task="task"
    />
    <!-- </div>
    </OakModal> -->
  </div>
</template>

<script>
import { sendMessage } from '@/events/MessageService';
import { mapGetters, mapActions } from 'vuex';
import UpdateTask from '@/components/Project/Task/UpdateTask.vue';
import OakModal from '@/oakui/OakModal.vue';
import CardPreview from './CardPreview.vue';

export default {
  name: 'Card',
  components: {
    UpdateTask,
    // OakModal,
    CardPreview,
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
    ...mapGetters(['getProfile', 'getUserById', 'getCommentsForTask']),
  },
  methods: {
    ...mapActions(['moveTask', 'moveStage']),
    dragStart(e) {
      this.dragClass = 'source-spot';
      e.dataTransfer.setData('id', this.task._id);
      e.dataTransfer.setData('domain', 'task');
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

  display: grid;
  grid-auto-flow: row;
  row-gap: 4px;
}
</style>

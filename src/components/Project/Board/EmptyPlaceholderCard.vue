<template>
  <div>
    <div
      v-bind:class="dragClass"
      class="card"
      @dragover.prevent="dragOver"
      @dragstart="dragStart"
      @dragend="dragEnd"
      @drop.prevent="drop"
      @dragleave="dragLeave"
    >
      <div class="container" />
    </div>
  </div>
</template>

<script>
import { sendMessage } from '@/events/MessageService';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EmptyPlaceholderCard',
  props: {
    stage: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      dragClass: '',
    };
  },
  computed: {
    ...mapGetters(['getTaskById']),
    assignedToUser: function() {
      return this.getUserById(this.task.assignedTo);
    },
  },
  methods: {
    ...mapActions(['saveTask', 'moveStage']),
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
      const type = e.dataTransfer.getData('domain');
      const id = e.dataTransfer.getData('id');
      this.dragClass = '';
      this.dragClass = '';
      if (type === 'task') {
        this.saveTask({ ...this.getTaskById(id), stageId: this.stage._id });
      } else if (type === 'stage') {
        this.moveStage({ moveStageId: id, afterStageId: this.stage._id });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  background-color: var(--color-background-transparent-1);
  border-radius: 4px;
  &.destination-spot {
    background-color: var(--color-tertiary-1);
    opacity: 0.4;
  }
  &.source-spot {
    background-color: var(--color-background-transparent-4);
  }
  .container {
    width: 100%;
    height: 75vh;
    // background-color: aqua;
  }
}
</style>

<template>
  <div>
    <div
      v-bind:class="dragClass"
      class="list-item"
      @drop.prevent="drop"
      @dragover.prevent="dragOver"
      @dragleave="dragLeave"
      @dragstart="dragStart"
      @dragend="dragEnd"
    >
      <div class="container" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { sendMessage } from '@/events/MessageService';
import UpdateTask from '@/components/Create/UpdateTask.vue';
import Avatar from '@/components/Avatar/Avatar.vue';
import OakModal from '@/oakui/OakModal.vue';
export default {
  name: 'EmptyListItem',
  props: {
    stage: Object,
  },
  data: function() {
    return {
      dragClass: '',
    };
  },
  computed: {
    ...mapGetters(['getTaskById']),
  },
  methods: {
    ...mapActions(['saveTask', 'moveStage']),
    dragStart(e) {
      this.dragClass = 'source-spot';
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
        this.saveTask({ ...this.getTaskById(id), stageId: this.stage._id });
      } else if (type === 'stage') {
        this.moveStage({ moveStageId: id, afterStageId: this.stage._id });
      }
    },
    toggleTask: function() {
      this.editTask = !this.editTask;
    },
  },
};
</script>

<style scoped lang="scss">
.list-item {
  border-radius: 6px;
  padding: 0 20px;
  height: 36px;
  overflow: hidden;
  background-color: var(--color-background-transparent-1);
  &.destination-spot {
    background-color: var(--color-tertiary-1);
  }
  &.source-spot {
    background-color: var(--color-background-3);
    border-bottom: 1px solid var(--color-primary-1);
  }
  .container {
    width: 100%;
    height: 75vh;
    // background-color: aqua;
  }
}
</style>

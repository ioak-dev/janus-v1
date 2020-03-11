<template>
  <div
    class="card app-content"
    draggable="true"
    @dragover.prevent="dragOver"
    @dragstart="dragStart"
    @dragend="dragEnd"
  >
    <div class="title">{{ task.title }}</div>
    <!-- <div class="description">{{ task.body }}</div> -->
  </div>
</template>

<script>
import { sendMessage } from '@/events/MessageService';
import { mapGetters } from 'vuex';

export default {
  name: 'Card',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  methods: {
    dragStart(e) {
      // sendMessage('dragging');
      e.dataTransfer.setData('id', this.task.id);
      setTimeout(() => {
        e.target.style.display = 'none';
      }, 0);
    },
    dragEnd() {
      sendMessage('dragging', false);
    },
    dragOver(e) {
      // console.log(
      //   e.screenX,
      //   window.screen.width,
      //   window.innerWidth,
      //   window.outerWidth,
      //   window.screen.availWidth * window.devicePixelRatio
      // );
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
  border-radius: 4px;
  // margin-bottom: 10px;
  // border: 1px solid var(--color-primary);
}
</style>

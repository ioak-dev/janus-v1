<template>
  <div :class="style" />
</template>
<script>
import { receiveMessage } from '../../events/MessageService';
export default {
  name: 'Backdrop',
  data: function() {
    return {
      style: '',
    };
  },
  mounted() {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'dialog' || message.name === 'modal') {
        console.log(message);
        if (message.signal) {
          this.style = 'backdrop-fade';
        } else {
          this.style = '';
        }
      }
    });
    return () => eventBus.unsubscribe();
  },
};
</script>
<style lang="scss" scoped>
.backdrop-fade {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-background-1);
  z-index: 2;
  opacity: 0.5;
  overflow: hidden;
}
</style>

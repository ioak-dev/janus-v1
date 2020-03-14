<template>
  <div>
    <div v-if="notification" v-bind:class="style">
      <div class="message">
        <div class="message-icon" v-if="notification.type === 'success'">
          <i class="material-icons">check_circle_outline</i>
        </div>
        <div class="message-text">
          {{ notification ? notification.message : '' }}
        </div>
      </div>
    </div>
    <div v-if="spinner" class="lds-dual-ring" />
  </div>
</template>
<script>
import { sendMessage, receiveMessage } from '@/events/MessageService';
export default {
  name: 'Notification',
  data: function() {
    return {
      spinner: false,
      notification: undefined,
    };
  },
  computed: {
    style: function() {
      return `notification ${this.notification?.type}`;
    },
  },
  created() {
    this.eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'notification') {
        if (!message.signal) {
          this.notification = undefined;
        } else {
          this.notification = message.data;
          this.spinner = false;

          if (message.data && message.data.duration) {
            setTimeout(() => {
              sendMessage('notification', false);
            }, message.data.duration);
          }
        }
      }

      if (message.name === 'spinner') {
        this.spinner = message.signal;
      }
    });
  },
  beforeDestroy() {
    this.eventBus.unsubscribe();
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>

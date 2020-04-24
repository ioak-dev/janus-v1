<template>
  <div class="oak-modal" :class="style">
    <div
      v-if="nodeVisible"
      class="modal"
      :class="visible ? 'show ' + style : 'hide ' + style"
    >
      <div :class="visible ? 'container' : 'container hidetext'">
        <div class="modal-header">
          <div class="container">
            <div class="title">{{ label }}</div>
            <div>
              <i class="material-icons" @click="$emit('close')">
                close
              </i>
            </div>
          </div>
        </div>
        <div v-if="$slots['modal-container']" class="modal-container">
          <slot name="modal-container" />
        </div>
        <div v-if="$slots['modal-body']" class="modal-body">
          <slot name="modal-body" />
        </div>
        <div v-if="$slots['modal-footer']" class="modal-footer">
          <slot name="modal-footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sendMessage } from '../events/MessageService';
export default {
  name: 'OakModal',
  props: {
    visible: Boolean,
    small: Boolean,
    fullscreen: Boolean,
    label: String,
    noheader: Boolean,
  },
  data() {
    return {
      style: this.getStyle(),
      nodeVisible: false,
    };
  },
  mounted() {
    document.addEventListener('keydown', this.escFunction, false);
  },
  methods: {
    getStyle() {
      let style = '';
      style += this.small ? ' small' : '';
      style += this.noheader ? ' noheader' : '';
      style += this.fullscreen ? ' fullscreen' : '';
      return style;
    },
    escFunction(event) {
      if (event.keyCode === 27) {
        if (this.visible) {
          this.$emit('close');
        }
      }
    },
  },
  watch: {
    visible: function(newValue, oldValue) {
      sendMessage('modal', newValue);
      if (newValue != oldValue) {
        if (newValue) {
          this.nodeVisible = newValue;
        } else {
          setTimeout(() => (this.nodeVisible = newValue), 200);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/oak-modal.scss';
</style>

<template>
  <div class="oak-dialog">
    <div
      v-if="visible"
      class="dialog"
      :class="visible ? 'show ' + style : 'hide ' + style"
    >
      <div :class="visible ? 'container' : 'container hidetext'">
        <div class="dialog-header">
          <div class="container" @click="$emit('close')">
            <i class="material-icons">close</i>
            <div class="text-esc">
              esc
            </div>
          </div>
        </div>
        <div class="dialog-body">
          <slot name="dialog-body" />
        </div>
        <div class="dialog-footer">
          <slot name="dialog-footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OakDialog',
  props: {
    visible: Boolean,
    small: Boolean,
    fullscreen: Boolean,
  },
  data() {
    return {
      style: this.getStyle(),
    };
  },
  mounted() {
    document.addEventListener('keydown', this.escFunction, false);
  },
  methods: {
    getStyle() {
      let style = '';
      style += this.small ? ' small' : '';
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/OakDialog.scss';
.dialog {
  &.show {
    width: calc(100vw - 362px - 50px);
    animation: slide-in 0.3s cubic-bezier(0, 1, 0.5, 1);
    &.fullscreen {
      width: 100vw;
      animation: slide-in-fullscreen 0.3s cubic-bezier(0, 1, 0.5, 1);
    }
    @media (max-width: 767px) {
      width: 100vw;
      animation: slide-in-fullscreen 0.3s cubic-bezier(0, 1, 0.5, 1);
    }
  }
  &.hide {
    animation: slide-in 0.3s ease-in-out;
  }
}
@keyframes slide-in-fullscreen {
  0% {
    width: 0%;
  }
  100% {
    width: 100vw;
    // width: calc(100vw - 362px - 50px);

    // &.fullscreen {
    //   width: calc(100vw - 25px);
    // }

    // @media (max-width: 767px) {
    //   width: calc(100vw - 5px);
    // }
  }
}
@keyframes slide-in {
  0% {
    width: 0%;
  }
  100% {
    width: calc(100vw - 362px - 50px);

    // @media (max-width: 767px) {
    //   width: calc(100vw - 5px);
    // }
  }
}
</style>

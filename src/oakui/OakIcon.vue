<template>
  <div class="oak-icon">
    <i v-if="mat" class="material-icons" :style="style">
      {{ mat }}
    </i>
    <EpicIcon v-if="svg === 'epic'" :style="style" />
    <!-- <SendIcon v-id="svg === 'vpn'" :style="getStyle" /> -->
  </div>
</template>
<script>
import EpicIcon from './icons/EpicIcon.vue';
export default {
  name: 'OakIcon',
  components: { EpicIcon },
  props: {
    mat: String,
    svg: String,
    size: String,
    color: String,
    theme: String,
  },
  computed: {
    style: function() {
      const style = {};
      style.fontSize = `${this.size}px`;
      style.height = `${this.size}px`;
      style.width = 'auto';
      switch (this.theme) {
        case 'primary':
          style.fill = 'var(--color-primary-1)';
          style.color = 'var(--color-primary-1)';
          break;
        case 'secondary':
          style.fill = 'var(--color-secondary-1)';
          style.color = 'var(--color-secondary-1)';
          break;
        case 'tertiary':
          style.fill = 'var(--color-tertiary-1)';
          style.color = 'var(--color-tertiary-1)';
          break;
        case 'success':
          style.fill = 'var(--color-success)';
          style.color = 'var(--color-success)';
          break;
        case 'failure':
          style.fill = 'var(--color-failure)';
          style.color = 'var(--color-failure)';
          break;
        case 'warning':
          style.fill = 'var(--color-warning)';
          style.color = 'var(--color-warning)';
          break;
        default:
          style.fill = 'var(--color-foreground-1)';
          style.color = 'var(--color-foreground-1)';
      }
      if (this.color) {
        style.fill = this.color;
        style.color = this.color;
      }
      return style;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './styles/oak-icon.scss';
</style>

<template>
  <button class="oak-button" :class="style" @click="$emit('click')">
    <div class="button-label-container">
      <i v-if="icon" class="material-icons">{{ icon }}</i>
      <i v-if="mat" class="material-icons">{{ mat }}</i>
      <OakIcon
        v-if="fa"
        v-bind:fa="fa"
        size="1.2em"
        color="var(--btn-text-color)"
      />
      <OakIcon
        v-if="svg"
        v-bind:svg="svg"
        size="1.2em"
        color="var(--btn-text-color)"
      />
      {{ label }}
    </div>
  </button>
</template>
<script>
import OakIcon from './OakIcon.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'OakButton',
  components: { OakIcon },
  props: {
    label: String,
    icon: String,
    mat: String,
    svg: String,
    fa: String,
    action: Object,
    variant: String,
    theme: String,
    align: String,
    small: Boolean,
    invert: Boolean,
  },
  computed: {
    ...mapGetters(['getProfile']),
    style() {
      let style = this.theme ? this.theme : '';
      style += this.getProfile?.theme?.includes('theme_light') ? ' light' : '';
      console.log(this.getProfile);
      style += this.variant ? ` ${this.variant}` : ' regular';

      if (!this.label) {
        style += ' icon';
      }

      style += this.invert ? ' invert' : '';

      style += this.small ? ' small' : '';

      style += this.align ? ` align-${this.align}` : '';

      return style;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/oak-button.scss';
</style>

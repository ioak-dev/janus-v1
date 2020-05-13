<template>
  <div class="oak-radio" :class="style">
    <!-- <div class="radio-container"> -->
    <label class="container">
      <input
        type="radio"
        :name="id"
        :checked="data"
        :id="id"
        @change="$emit('change')"
        :disabled="disabled"
      />
      <span class="checkmark"> </span>
    </label>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: 'OakRadio',
  props: {
    label: String,
    id: String,
    data: Boolean,
    labelPosition: String,
    variant: String,
    theme: String,
    disabled: Boolean,
  },
  computed: {
    style: function() {
      let style = this.theme ? this.theme : '';
      style += this.variant ? ` ${this.variant}` : '';
      return style;
    },
  },
  methods: {
    handleChange: function(checkedState) {
      event.target.value = checkedState;
      this.$emit('change', event);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './styles/oak-radio.scss';
</style>

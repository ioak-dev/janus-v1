<template>
  <div class="oak-check-box" :class="style">
    <div class="checkbox-container">
      <label class="checkbox">
        <input
          type="checkbox"
          :name="id"
          :checked="data"
          :id="id"
          @change="$emit('change')"
          :disabled="disabled"
        />
        <label class="typography-5" :for="id">
          {{ label }}
        </label>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OakCheckbox',
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
@import './styles/oak-checkbox.scss';
</style>

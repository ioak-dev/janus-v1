<template>
  <div class="oak-select">
    <label v-if="label" class="form-element-label">{{ label }}</label>
    <select @change="$emit('change')" v-bind:name="id" class="select">
      <option value="" :selected="'' === data">None</option>
      <option
        v-for="item in elements"
        :key="item"
        :value="item"
        :selected="item === data"
      >
        {{ item }}
      </option>
      <option
        v-for="item in objects"
        :key="item.key"
        :value="item.key"
        :selected="item === data"
      >
        {{ item.value }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'OakSelect',
  props: {
    id: String,
    label: String,
    error: Boolean,
    data: [String, Number],
    elements: Array,
    objects: Array,
    first: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/oak-select.scss';
</style>

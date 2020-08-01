<template>
  <div class="oak-date">
    <input
      :disabled="disabled"
      type="date"
      :name="id"
      v-model="value"
      @change="onChange(value)"
    />
    <label v-if="label" :for="id">
      {{ label }}
    </label>
  </div>
</template>
<script>
import { sendMessage } from '@/events/MessageService';
export default {
  name: 'OakDate',
  props: {
    label: String,
    id: String,
    data: String,
    errorFields: Object,
    disabled: Boolean,
  },
  data() {
    return { value: '2020-01-01' };
  },
  mounted() {
    this.value = this.data;
  },
  watch: {
    data: function() {
      this.value = this.data;
    },
  },
  methods: {
    onChange(valueIn) {
      this.$emit('change', { target: { name: this.id, value: valueIn } });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/OakDate.scss';
</style>

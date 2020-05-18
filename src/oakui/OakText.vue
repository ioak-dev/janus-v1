<template>
  <div class="oak-text-field">
    <template v-if="!multiline">
      <input
        v-if="type === 'number'"
        :disabled="disabled"
        autoComplete="off"
        :type="type ? type : 'text'"
        :name="id"
        v-model.number="value"
        @keyup="$emit('change', value)"
        @blur="blurEvent"
        @focus="$emit('focus')"
      />
      <input
        v-else
        :disabled="disabled"
        autoComplete="off"
        :type="type ? type : 'text'"
        :name="id"
        v-model="value"
        @keyup="$emit('change')"
        @blur="blurEvent"
        @focus="$emit('focus')"
      />
    </template>
    <textarea
      v-else
      :disabled="disabled"
      :name="id"
      :value="data"
      v-bind:rows="rows"
      @keyup="$emit('change')"
      @blur="blurEvent"
    />
    <label
      v-if="label"
      :for="id"
      clas="formelement-label"
      :class="data ? 'active' : ''"
    >
      {{ label }}
    </label>
  </div>
</template>
<script>
import { sendMessage } from '@/events/MessageService';
export default {
  name: 'OakText',
  props: {
    label: String,
    id: String,
    data: [String, Number],
    type: String,
    handleChange: Function,
    errorFields: Object,
    disabled: Boolean,
    rows: Number,
    multiline: Boolean,
    placeholder: String,
  },
  data() {
    return { value: '' };
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
    blurEvent: function() {
      this.$emit('blur');
      sendMessage('blur', true, {
        id: this.id,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/OakText.scss';
</style>

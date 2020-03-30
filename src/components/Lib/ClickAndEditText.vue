<template>
  <OakClickAndEdit
    v-bind:id="id"
    v-bind:label="label ? label : null"
    v-bind:alwaysEdit="alwaysEditFields.includes(id)"
  >
    <div slot="edit-content">
      <OakText
        v-bind:data="data[id]"
        v-bind:id="id"
        @change="$emit('change')"
      />
    </div>
    <div slot="view-content">
      <div class="typography-5">
        {{ data[id] ? data[id] : 'None' }}
      </div>
    </div>
  </OakClickAndEdit>
</template>
<script>
import OakClickAndEdit from '@/oakui/OakClickAndEdit.vue';
import OakText from '@/oakui/OakText.vue';
export default {
  name: 'ClickAndEditText',
  props: {
    alwaysEditFields: Array,
    data: Object,
    id: String,
    label: String,
  },
  components: {
    OakText,
    OakClickAndEdit,
  },
};
</script>

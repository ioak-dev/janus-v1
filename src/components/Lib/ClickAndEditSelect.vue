<template>
  <OakClickAndEdit
    v-bind:id="id"
    v-bind:alwaysEdit="alwaysEditFields.includes(id)"
  >
    <div slot="edit-content">
      <OakSelect
        v-if="objects"
        v-bind:data="data[id]"
        v-bind:id="id"
        @change="$emit('change')"
        v-bind:label="label ? label : id"
        v-bind:objects="objects"
      />
      <OakSelect
        v-else
        v-bind:data="data[id]"
        v-bind:id="id"
        @change="$emit('change')"
        v-bind:label="id"
        v-bind:elements="elements"
      />
    </div>
    <div slot="view-content">
      <div class="typography-5 form-element-label">
        {{ label ? label : id }}
      </div>
      <div class="typography-5">
        {{ data[id] ? data[id] : 'None' }}
      </div>
    </div>
  </OakClickAndEdit>
</template>
<script>
import OakClickAndEdit from '@/oakui/OakClickAndEdit.vue';
import OakSelect from '@/oakui/OakSelect.vue';
export default {
  name: 'ClickAndEditText',
  props: {
    alwaysEditFields: Array,
    data: Object,
    id: String,
    label: String,
    elements: Array,
    objects: Array,
  },
  components: {
    OakSelect,
    OakClickAndEdit,
  },
};
</script>

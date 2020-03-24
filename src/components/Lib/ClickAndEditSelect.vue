<template>
  <OakClickAndEdit
    v-bind:id="id"
    v-bind:label="label ? label : id"
    v-bind:alwaysEdit="alwaysEditFields.includes(id)"
  >
    <div slot="edit-content">
      <OakSelect
        v-if="objects"
        v-bind:data="data[id]"
        v-bind:id="id"
        @change="$emit('change')"
        v-bind:objects="objects"
      />
      <OakSelect
        v-else
        v-bind:data="data[id]"
        v-bind:id="id"
        @change="$emit('change')"
        v-bind:elements="elements"
      />
    </div>
    <div slot="view-content">
      <div class="typography-5">
        {{ viewData }}
      </div>
    </div>
  </OakClickAndEdit>
</template>
<script>
import OakClickAndEdit from '@/oakui/OakClickAndEdit.vue';
import OakSelect from '@/oakui/OakSelect.vue';
export default {
  name: 'ClickAndEditSelect',
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
  computed: {
    viewData: function() {
      if (this.elements) {
        return this.data[this.id] ? this.data[this.id] : 'None';
      } else if (this.objects) {
        console.log(this.objects, this.data, this.id);
        return this.objects.find(item => item.key === this.data[this.id])
          ?.value;
      }
      return '';
    },
  },
};
</script>

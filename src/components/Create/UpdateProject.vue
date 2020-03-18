<template>
  <div>
    <OakDialog @close="$emit('close')" v-bind:visible="visible">
      <div slot="dialog-body">
        <ClickAndEditText
          v-bind:data="data"
          id="name"
          label="Project Name"
          v-bind:alwaysEditFields="alwaysEditFields"
          @change="handleChange"
        />
        <ClickAndEditSelect
          v-bind:data="data"
          id="type"
          v-bind:alwaysEditFields="alwaysEditFields"
          v-bind:elements="['Kanban', 'Scrum']"
          @change="handleChange"
        />
      </div>
      <div slot="dialog-footer">
        <OakButton
          theme="primary"
          variant="animate in"
          @click="save"
          label="Save"
        />
      </div>
    </OakDialog>
  </div>
</template>
<script>
import OakDialog from '@/oakui/OakDialog.vue';
import OakButton from '@/oakui/OakButton.vue';
import { mapActions } from 'vuex';
import ClickAndEditText from '@/components/Lib/ClickAndEditText.vue';
import ClickAndEditSelect from '@/components/Lib/ClickAndEditSelect.vue';

export default {
  name: 'UpdateProject',
  components: {
    OakDialog,
    OakButton,
    ClickAndEditText,
    ClickAndEditSelect,
  },
  props: {
    visible: Boolean,
    project: Object,
    alwaysEditFields: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  data: function() {
    return {
      data: {},
    };
  },
  created() {
    this.data = { ...this.project };
  },
  methods: {
    ...mapActions(['saveProject']),
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    save: function() {
      this.saveProject(this.data);
    },
  },
};
</script>
<style lang="scss" scoped></style>

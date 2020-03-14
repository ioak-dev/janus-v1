<template>
  <div>
    <OakDialog @close="$emit('close')" v-bind:visible="visible">
      <div slot="dialog-body">
        <ClickAndEditSelect
          v-bind:data="data"
          id="projectId"
          label="Project"
          v-bind:alwaysEditFields="alwaysEditFields"
          v-bind:objects="projectDropDown"
          @change="handleChange"
        />
        <ClickAndEditText
          v-bind:data="data"
          id="name"
          label="Stage Name"
          v-bind:alwaysEditFields="alwaysEditFields"
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
import { mapActions, mapGetters } from 'vuex';
import ClickAndEditText from '@/components/Lib/ClickAndEditText.vue';
import ClickAndEditSelect from '@/components/Lib/ClickAndEditSelect.vue';

export default {
  name: 'UpdateStage',
  components: {
    OakDialog,
    OakButton,
    ClickAndEditText,
    ClickAndEditSelect,
  },
  props: {
    visible: Boolean,
    stage: Object,
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
    this.data = { ...this.stage };
  },
  computed: {
    ...mapGetters(['getProjects']),
    projectDropDown: function() {
      const projectList = [];
      this.getProjects.forEach(item =>
        projectList.push({ key: item._id, value: item.name })
      );
      return projectList;
    },
  },
  methods: {
    ...mapActions(['saveStage']),
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    save: function() {
      this.saveStage(this.data);
    },
  },
};
</script>
<style lang="scss" scoped></style>

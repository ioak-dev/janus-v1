<template>
  <div>
    <div class="modal-body two-column">
      <div class="typography-4">Project</div>
      <OakSelect
        v-bind:data="data.projectId"
        id="projectId"
        @change="handleChange"
        v-bind:objects="projectDropDown"
      />
      <div class="typography-4">Stage Name</div>
      <OakText v-bind:data="data.name" id="name" @change="handleChange" />
    </div>
    <div class="modal-footer">
      <OakButton
        theme="primary"
        variant="animate in"
        @click="save"
        label="Save"
      />
    </div>
  </div>
</template>
<script>
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import { mapActions, mapGetters } from 'vuex';
import OakSelect from '@/oakui/OakSelect.vue';

export default {
  name: 'UpdateStage',
  components: {
    OakSelect,
    OakText,
    OakButton,
  },
  props: {
    stage: Object,
  },
  data: function() {
    return {
      data: {},
    };
  },
  created() {
    this.data = { ...this.stage };
  },
  watch: {
    stage: function() {
      this.data = { ...this.stage };
    },
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
<style lang="scss" scoped>
.two-column {
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  row-gap: 20px;
  column-gap: 10px;
}
</style>

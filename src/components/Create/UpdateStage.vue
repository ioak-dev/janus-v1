<template>
  <div>
    <div>
      <OakSelect
        v-if="!stage._id"
        v-bind:data="data.projectId"
        id="projectId"
        label="Project"
        @change="handleChange"
        v-bind:objects="projectDropDown"
      />
      <OakText
        v-bind:data="data.name"
        id="name"
        label="Workflow Name"
        @change="handleChange"
      />
    </div>
    <div class="modal-footer">
      <div v-if="showDeletePrompt" class="action-section">
        <OakButton
          theme="primary"
          variant="animate in"
          @click="remove"
          icon="delete"
          label="Confirm Deletion"
        />
        <OakButton
          theme="primary"
          variant="animate in"
          @click="toggleDeletePrompt"
          icon="close"
          label="Cancel"
        />
      </div>
      <div v-else class="action-section">
        <OakButton
          theme="primary"
          variant="animate in"
          @click="toggleDeletePrompt"
          icon="delete"
          label="Delete"
        />
        <OakButton
          theme="primary"
          variant="animate in"
          @click="save"
          icon="check"
          label="Save"
        />
      </div>
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
      showDeletePrompt: false,
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
    ...mapActions(['saveStage', 'deleteStage']),
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    save: async function() {
      const outcome = await this.saveStage(this.data);
      console.log(outcome);
      if (outcome) {
        this.$emit('success');
      } else {
        this.$emit('failure');
      }
    },
    remove: function() {
      this.deleteStage(this.stage._id);
    },
    toggleDeletePrompt: function() {
      this.showDeletePrompt = !this.showDeletePrompt;
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

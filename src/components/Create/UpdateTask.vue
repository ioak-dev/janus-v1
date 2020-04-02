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
        <ClickAndEditSelect
          v-bind:data="data"
          id="stageId"
          label="Stage"
          v-bind:alwaysEditFields="alwaysEditFields"
          v-bind:objects="stageDropDown"
          @change="handleChange"
        />
        <ClickAndEditSelect
          v-bind:data="data"
          id="type"
          v-bind:alwaysEditFields="alwaysEditFields"
          v-bind:elements="['Epic', 'Story', 'Task', 'Sub-Task', 'Bug']"
          @change="handleChange"
        />
        <ClickAndEditSelect
          v-bind:data="data"
          id="priority"
          v-bind:alwaysEditFields="alwaysEditFields"
          v-bind:elements="['Could have', 'Should have', 'Must have']"
          @change="handleChange"
        />
        <ClickAndEditText
          v-bind:data="data"
          id="title"
          v-bind:alwaysEditFields="alwaysEditFields"
          @change="handleChange"
        />
        <Assignee
          v-bind:id="data.assignedTo"
          @remove="clearAssignee"
          @change="handleAssigneeChange"
          v-bind:teamIdList="teamIdList"
        />
        <OakEditor
          id="task-description"
          v-bind:data="data.description"
          @change="handleDescriptionChange"
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
import OakShowdown from '@/oakui/OakShowdown.vue';
import OakDialog from '@/oakui/OakDialog.vue';
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakClickAndEdit from '@/oakui/OakClickAndEdit.vue';
import OakEditor from '@/oakui/OakEditor.vue';
import ClickAndEditText from '@/components/Lib/ClickAndEditText.vue';
import ClickAndEditSelect from '@/components/Lib/ClickAndEditSelect.vue';
import Assignee from './Assignee.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UpdateTask',
  components: {
    OakDialog,
    // OakText,
    OakEditor,
    OakButton,
    // OakClickAndEdit,
    // OakShowdown,
    ClickAndEditText,
    ClickAndEditSelect,
    Assignee,
  },
  props: {
    visible: Boolean,
    task: Object,
    alwaysEditFields: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  data: function() {
    return {
      data: {
        projectId: '',
        stageId: '',
        type: '',
        priority: '',
        title: '',
        description: '',
        assignedTo: '',
      },
      teamIdList: [],
      stageDropDown: [],
    };
  },
  computed: {
    ...mapGetters(['getProjects', 'getStagesByProjectId', 'getProjectById']),
    projectDropDown: function() {
      const projectList = [];
      this.getProjects.forEach(item =>
        projectList.push({ key: item._id, value: item.name })
      );
      return projectList;
    },
  },
  created() {
    this.data = { ...this.task };
  },
  watch: {
    task: function() {
      this.data = { ...this.task };
    },
    'data.projectId': function(newProjectId, oldProjectId) {
      if (newProjectId && oldProjectId !== newProjectId) {
        this.fetchStageDropdown();
        this.teamIdList = this.getProjectById(newProjectId).teamIdList;
      }
    },
  },
  methods: {
    ...mapActions(['saveTask']),
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    handleDescriptionChange: function(text) {
      this.data.description = text;
    },
    fetchStageDropdown: function() {
      const stageList = [];
      this.getStagesByProjectId(this.data.projectId).forEach(item =>
        stageList.push({ key: item._id, value: item.name })
      );
      this.stageDropDown = stageList;
    },
    save: function() {
      this.saveTask(this.data);
    },
    clearAssignee: function() {
      this.data.assignedTo = '';
    },
    handleAssigneeChange: function(key) {
      this.data.assignedTo = key;
    },
  },
};
</script>
<style lang="scss" scoped></style>

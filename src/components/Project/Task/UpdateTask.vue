<template>
  <OakModal
    @close="$emit('toggle')"
    v-bind:visible="visible"
    label="Quick Edit - Task"
  >
    <div slot="modal-body" class="form">
      <OakSelect
        v-if="!task.taskId"
        v-bind:data="data.projectId"
        id="projectId"
        label="Project name"
        @change="handleChange"
        v-bind:objects="projectDropDown"
      />
      <OakSelect
        v-if="!task.taskId"
        v-bind:data="data.stageId"
        label="Workflow"
        id="stageId"
        @change="handleChange"
        v-bind:objects="stageDropDown"
      />
      <OakSelect
        v-bind:data="data.type"
        id="type"
        label="Task type"
        @change="handleChange"
        v-bind:elements="['Epic', 'Story', 'Task', 'Sub-task', 'Defect']"
      />
      <OakText
        v-bind:data="data['title']"
        id="title"
        label="Title"
        @change="handleChange"
      />
      <OakEditor
        v-bind:id="'task-description-' + task._id"
        label="Description"
        v-bind:data="data.description"
        @change="handleDescriptionChange"
        alwaysEdit
      />
      <OakText
        v-if="
          chosenProject && chosenProject.estimationMetric === 'Time estimate'
        "
        v-bind:data="data.timeEstimate"
        id="timeEstimate"
        :label="`Time estimate (${data.timeEstimate} hours)`"
        @change="handleChange"
        type="number"
      />
      <OakText
        v-else
        v-bind:data="data.storyPoints"
        id="storyPoints"
        label="Story points"
        @change="handleChange"
        type="number"
      />
      <Assignee
        v-bind:assignedTo="data.assignedTo"
        @remove="removeAssignee"
        @add="addAssignee"
        v-bind:projectId="data.projectId"
      />
    </div>
    <div slot="modal-footer" class="modal-footer">
      <div>
        <OakButton
          v-if="task.taskId"
          theme="primary"
          variant="appear"
          @click="openDetailedView"
          icon="visibility"
          label="Detailed View"
        />
      </div>
      <div>
        <OakButton
          theme="primary"
          variant="appear"
          @click="save"
          icon="check"
          label="Save"
        />
      </div>
    </div>
  </OakModal>
</template>
<script>
import OakShowdown from '@/oakui/OakShowdown.vue';
import OakModal from '@/oakui/OakModal.vue';
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakClickAndEdit from '@/oakui/OakClickAndEdit.vue';
import OakEditor from '@/oakui/OakEditor.vue';
import OakSelect from '@/oakui/OakSelect.vue';
import ClickAndEditText from '@/components/Lib/ClickAndEditText.vue';
import ClickAndEditSelect from '@/components/Lib/ClickAndEditSelect.vue';
import Assignee from '@/components/Create/Assignee.vue';
import { mapActions, mapGetters } from 'vuex';
import { sendMessage } from '@/events/MessageService';

export default {
  name: 'UpdateTask',
  components: {
    OakModal,
    OakEditor,
    OakButton,
    OakText,
    OakSelect,
    Assignee,
  },
  props: {
    task: Object,
    visible: Boolean,
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
    };
  },
  computed: {
    ...mapGetters([
      'getProjects',
      'getStagesByProjectId',
      'getProjectById',
      'getProfile',
    ]),
    chosenProject: function() {
      return this.getProjectById(this.data.projectId);
    },
    projectDropDown: function() {
      const projectList = [];
      this.getProjects.forEach(item =>
        projectList.push({ key: item._id, value: item.name })
      );
      return projectList;
    },
    stageDropDown: function() {
      const stageList = [];
      this.getStagesByProjectId(this.data.projectId).forEach(item =>
        stageList.push({ key: item._id, value: item.name })
      );
      return stageList;
    },
  },
  created() {
    this.data = { ...this.task };
  },
  watch: {
    task: function() {
      this.data = { ...this.task };
    },
  },
  methods: {
    ...mapActions(['saveTask']),
    handleChange: function(value) {
      this.data[event.target.name] =
        value !== undefined && value !== null ? value : event.target.value;
    },
    handleDescriptionChange: function(text) {
      this.data.description = text;
    },
    save: async function() {
      const outcome = await this.saveTask(this.data);
      if (outcome) {
        // this.$emit('success');
        this.$emit('toggle');
      } else {
        // this.$emit('failure');
        console.log('failed to save task');
      }
    },
    removeAssignee: function(key) {
      this.data.assignedTo = this.data.assignedTo.filter(item => item !== key);
    },
    addAssignee: function(key) {
      if (!this.data.assignedTo.includes(key)) {
        this.data.assignedTo.push(key);
      }
    },
    openDetailedView: function() {
      sendMessage('modal', false);
      this.$router.push({
        path: `/${this.getProfile.space}/${this.task.projectId}/dashboard`,
        query: { view: 'task', taskid: this.task.taskId },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>

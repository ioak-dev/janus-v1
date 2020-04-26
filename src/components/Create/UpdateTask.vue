<template>
  <div>
    <div class="modal-body two-column">
      <div v-if="!task.taskId" class="typography-4">Project</div>
      <OakSelect
        v-if="!task.taskId"
        v-bind:data="data.projectId"
        id="projectId"
        @change="handleChange"
        v-bind:objects="projectDropDown"
      />
      <div v-if="!task.taskId" class="typography-4">Stage</div>
      <OakSelect
        v-if="!task.taskId"
        v-bind:data="data.stageId"
        id="stageId"
        @change="handleChange"
        v-bind:objects="stageDropDown"
      />
      <div class="typography-4">Task type</div>
      <OakSelect
        v-bind:data="data.type"
        id="type"
        @change="handleChange"
        v-bind:elements="['Epic', 'Story', 'Task', 'Sub-task', 'Defect']"
      />
      <div class="typography-4">Title</div>
      <OakText v-bind:data="data['title']" id="title" @change="handleChange" />
      <div class="typography-4">Assignee</div>
      <Assignee
        v-bind:id="data.assignedTo"
        @remove="clearAssignee"
        @change="handleAssigneeChange"
        v-bind:teamIdList="teamIdList"
      />
      <div class="typography-4">Description</div>
      <OakEditor
        v-bind:id="'task-description-' + task._id"
        v-bind:data="data.description"
        @change="handleDescriptionChange"
        alwaysEdit
      />
    </div>
    <div class="modal-footer">
      <div>
        <OakButton
          v-if="task.taskId"
          theme="primary"
          variant="animate in"
          @click="openDetailedView"
          label="Detailed View"
        />
      </div>
      <div>
        <OakButton
          theme="primary"
          variant="animate in"
          @click="save"
          label="Save"
        />
      </div>
    </div>
  </div>
</template>
<script>
import OakShowdown from '@/oakui/OakShowdown.vue';
import OakDialog from '@/oakui/OakDialog.vue';
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakClickAndEdit from '@/oakui/OakClickAndEdit.vue';
import OakEditor from '@/oakui/OakEditor.vue';
import OakSelect from '@/oakui/OakSelect.vue';
import ClickAndEditText from '@/components/Lib/ClickAndEditText.vue';
import ClickAndEditSelect from '@/components/Lib/ClickAndEditSelect.vue';
import Assignee from './Assignee.vue';
import { mapActions, mapGetters } from 'vuex';
import { sendMessage } from '../../events/MessageService';

export default {
  name: 'UpdateTask',
  components: {
    OakEditor,
    OakButton,
    OakText,
    OakSelect,
    Assignee,
  },
  props: {
    task: Object,
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
    ...mapGetters([
      'getProjects',
      'getStagesByProjectId',
      'getProjectById',
      'getProfile',
    ]),
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
    handleClose: function() {
      this.$emit('close');
      this.data = { ...this.task };
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
    openDetailedView: function() {
      sendMessage('modal', false);
      this.$router.push({
        path: `/${this.getProfile.space}/${this.task.projectId}/main`,
        query: { view: 'task', taskid: this.task.taskId },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.two-column {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  row-gap: 20px;
  column-gap: 10px;
}
</style>

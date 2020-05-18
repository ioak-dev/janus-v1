<template>
  <OakModal @close="$emit('toggle')" v-bind:visible="visible" label="New task">
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
      <Assignee
        v-bind:assignedTo="data.assignedTo"
        @remove="removeAssignee"
        @add="addAssignee"
        v-bind:projectId="data.projectId"
      />
      <OakEditor
        v-bind:id="'task-description-' + task._id"
        label="Description"
        v-bind:data="data.description"
        @change="handleDescriptionChange"
        alwaysEdit
      />
      <div class="space-top-2 space-bottom-2">
        <OakButton
          class="space-right-2"
          v-if="task.taskId"
          theme="primary"
          variant="regular"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          class="space-right-2"
          theme="secondary"
          variant="regular"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          class="space-right-2"
          theme="tertiary"
          variant="regular"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          theme="default"
          variant="regular"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
      </div>
      <div class="space-top-2 space-bottom-2">
        <OakButton
          class="space-right-2"
          v-if="task.taskId"
          theme="primary"
          variant="appear"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          class="space-right-2"
          theme="secondary"
          variant="appear"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          class="space-right-2"
          theme="tertiary"
          variant="appear"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          theme="default"
          variant="appear"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
      </div>
      <div class="space-top-2 space-bottom-2">
        <OakButton
          class="space-right-2"
          v-if="task.taskId"
          theme="primary"
          variant="outline"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          class="space-right-2"
          theme="secondary"
          variant="outline"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          class="space-right-2"
          theme="tertiary"
          variant="outline"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          theme="default"
          variant="outline"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
        <OakButton
          v-if="task.taskId"
          theme="primary"
          variant="drama"
          @click="openDetailedView"
          icon="visibility"
          label="View"
        />
      </div>
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
import OakModal from '@/oakui/OakModal.vue';
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
  name: 'NewTask',
  components: {
    OakEditor,
    OakModal,
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
        assignedTo: [],
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
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    handleDescriptionChange: function(text) {
      this.data.description = text;
    },
    save: async function() {
      const outcome = await this.saveTask(this.data);
      if (outcome) {
        this.$emit('success');
      } else {
        this.$emit('failure');
      }
    },
    removeAssignee: function(key) {
      this.data.assignedTo = this.data.assignedTo.filter(item => item !== key);
    },
    addAssignee: function(key) {
      if (!this.data.assignedTo) {
        this.data.assignedTo = [];
      }
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

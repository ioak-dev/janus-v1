<template>
  <div class="view-subtask">
    <div class="create-sub-task" v-if="data.showNew">
      <div v-if="taskTypes.length > 1">
        <OakSelect
          v-bind:data="data.type"
          id="type"
          label="Task type"
          @change="handleChange"
          v-bind:elements="taskTypes"
        />
      </div>
      <div v-else>{{ taskTypes[0] }}</div>
      <OakText
        id="title"
        label="Summary"
        v-bind:data="data.title"
        @change="handleChange"
      />
      <OakText
        id="description"
        label="Description"
        v-bind:data="data.description"
        @change="handleChange"
        multiline
        v-bind:rows="10"
      />
    </div>
    <div class="list-view" v-else>
      <div v-for="item in subtasks" v-bind:key="item._id">
        <SubtaskRow v-bind:subtask="item" />
      </div>
    </div>
    <div class="action">
      <OakButton
        v-if="data.showNew"
        theme="primary"
        variant="appear"
        @click="save"
        label="Save Sub-task"
      />
      <OakButton
        v-if="!data.showNew"
        theme="primary"
        variant="appear"
        @click="toggleAdd"
        label="Add existing"
      />
      <OakButton
        v-if="!data.showNew"
        theme="primary"
        variant="appear"
        @click="toggle"
        label="New"
      />
      <OakButton
        v-if="data.showNew"
        theme="primary"
        variant="appear"
        @click="toggle"
        label="Cancel"
      />
    </div>
    <ChooseTask
      v-bind:visible="addDialog"
      multiselect
      @toggle="toggleAdd"
      @choose="handleAddTask"
      v-bind:task="task"
      v-bind:types="taskTypes"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakModal from '@/oakui/OakModal.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakText from '@/oakui/OakText.vue';
import OakSelect from '@/oakui/OakSelect.vue';
import SubtaskRow from './SubtaskRow.vue';
import ChooseTask from '../Task/ChooseTask.vue';

export default {
  name: 'ViewSubtask',
  components: {
    OakButton,
    OakText,
    OakSelect,
    SubtaskRow,
    ChooseTask,
  },
  props: { task: Object },
  data: function() {
    return {
      data: {
        showNew: false,
        title: '',
        description: '',
        type: '',
      },
      addDialog: false,
    };
  },
  computed: {
    ...mapGetters(['getSubtasksByTaskId', 'getTaskById']),
    subtasks: function() {
      return this.task ? this.getSubtasksByTaskId(this.task._id) : [];
    },
    taskTypes: function() {
      let response = [];
      switch (this.task.type) {
        case 'Story':
          response = ['Sub-task', 'Defect'];
          break;
        case 'Epic':
          response = ['Story', 'Task', 'Defect'];
          break;
        case 'Task':
          return ['Sub-task', 'Defect'];
      }
      return response;
    },
  },
  methods: {
    ...mapActions(['saveTask']),
    toggle: function() {
      this.data.showNew = !this.data.showNew;
      this.data = { ...this.data, title: '', description: '', type: '' };
      this.$emit('viewUpdated');
    },
    toggleAdd: function() {
      this.addDialog = !this.addDialog;
    },
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    handleAddTask: function(chosenData) {
      chosenData?.forEach(item => {
        this.saveTask({
          ...this.getTaskById(item),
          parentTaskId: this.task._id,
        });
      });

      this.toggleAdd();
    },
    save: function() {
      this.saveTask({
        type: this.data.type,
        stageId: this.task.stageId,
        title: this.data.title,
        description: this.data.description,
        priority: this.task.priority,
        projectId: this.task.projectId,
        parentTaskId: this.task._id,
      });
      this.toggle();
    },
  },
};
</script>
<style lang="scss" scoped>
.view-subtask {
  .list-view {
    display: grid;
    grid-auto-flow: row;
    row-gap: 20px;
  }
  .create-sub-task {
    display: grid;
    grid-auto-flow: row;
  }
  .action {
    padding-top: 20px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 20px;
    justify-content: center;
  }
}
</style>

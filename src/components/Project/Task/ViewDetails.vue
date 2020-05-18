<template>
  <div class="view-details">
    <div class="section">
      <OakText
        v-bind:data="data.title"
        id="title"
        label="Title"
        @change="handleChange"
      />
      <OakSelect
        v-bind:data="data.type"
        label="Task type"
        id="type"
        @change="handleChange"
        v-bind:elements="['Epic', 'Story', 'Task', 'Sub-task', 'Defect']"
      />
      <OakSelect
        v-bind:data="data.stageId"
        id="stageId"
        label="Workflow"
        v-bind:objects="stageDropDown"
        @change="handleChange"
      />
      <OakSelect
        v-bind:data="data.priority"
        id="priority"
        label="Priority"
        v-bind:elements="['Low', 'Medium', 'High', 'Critical']"
        @change="handleChange"
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
      <template v-if="task && !['Epic'].includes(data.type)">
        <div class="parent-task" v-if="data.parentTaskId">
          <div class="typography-4">Parent Task</div>
          <div class="typography-4 one-line-text">
            {{
              `${getTaskById(data.parentTaskId).taskId} (${
                getTaskById(data.parentTaskId).title
              })`
            }}
          </div>
          <div
            class="parent-task-link"
            @click="toggleParentSelectionDialogOpen"
          >
            Change
          </div>
        </div>
        <div class="parent-task" v-else>
          <div class="typography-4">Parent Task</div>
          <div
            class="parent-task-link"
            @click="toggleParentSelectionDialogOpen"
          >
            Choose
          </div>
        </div>
      </template>
      <template v-if="task && !['Epic'].includes(data.type)">
        <div class="epic" v-if="data.epic">
          <div class="typography-4">Epic</div>
          <div class="typography-4 one-line-text">
            {{
              `${getTaskById(data.epic).taskId} (${
                getTaskById(data.epic).title
              })`
            }}
          </div>
          <div class="epic-link" @click="toggleEpicSelectionDialogOpen">
            Change
          </div>
        </div>
        <div class="epic" v-else>
          <div class="typography-4">Epic</div>
          <div class="epic-link" @click="toggleEpicSelectionDialogOpen">
            Choose
          </div>
        </div>
      </template>
      <!-- </div> -->
      <!-- <div class="hr" /> -->
      <!-- <div class="section container">
      <div class="content single-column"> -->
      <div>
        <OakEditor
          v-if="data.stageId"
          id="task-description"
          label="Description"
          alwaysEdit
          v-bind:data="data.description"
          @change="handleDescriptionChange"
        />
      </div>
      <!-- </div> -->
    </div>

    <div class="action">
      <OakButton
        theme="primary"
        variant="appear"
        @click="save"
        label="Save basic details"
      />
    </div>
    <ChooseTask
      v-bind:visible="parentSelectionDialogOpen"
      @toggle="toggleParentSelectionDialogOpen"
      @choose="handleParentTaskChange"
      v-bind:task="task"
      label="Choose parent task"
      v-bind:types="['Story', 'Task']"
    />
    <ChooseTask
      v-bind:visible="epicSelectionDialogOpen"
      @toggle="toggleEpicSelectionDialogOpen"
      @choose="handleEpicChange"
      v-bind:task="task"
      label="Choose epic"
      v-bind:types="['Epic']"
    />
  </div>
</template>
<script>
import OakSelect from '@/oakui/OakSelect.vue';
import OakEditor from '@/oakui/OakEditor.vue';
import OakButton from '@/oakui/OakButton.vue';
import Assignee from '@/components/Create/Assignee.vue';
import { mapActions, mapGetters } from 'vuex';
import OakText from '@/oakui/OakText.vue';
import ChooseTask from './ChooseTask.vue';
export default {
  name: 'ViewDetails',
  components: {
    OakEditor,
    OakText,
    OakSelect,
    Assignee,
    OakButton,
    ChooseTask,
  },
  props: { task: Object },
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
        parentTaskId: '',
        epic: '',
      },
      parentSelectionDialogOpen: false,
      epicSelectionDialogOpen: false,
    };
  },
  computed: {
    ...mapGetters(['getStagesByProjectId', 'getProjectById', 'getTaskById']),
    projectDropDown: function() {
      const projectList = [];
      this.getProjects.forEach(item =>
        projectList.push({ key: item._id, value: item.name })
      );
      return projectList;
    },
    chosenProject: function() {
      return this.getProjectById(this.data.projectId);
    },
    stageDropDown: function() {
      const stageList = [];
      this.getStagesByProjectId(this.data.projectId).forEach(item =>
        stageList.push({ key: item._id, value: item.name })
      );
      return stageList;
    },
  },
  mounted() {
    this.data = { ...this.data, ...this.task };
  },
  watch: {
    task: function() {
      this.data = { ...this.data, ...this.task };
    },
  },
  methods: {
    ...mapActions(['saveTask']),
    toggleParentSelectionDialogOpen: function() {
      this.parentSelectionDialogOpen = !this.parentSelectionDialogOpen;
    },
    toggleEpicSelectionDialogOpen: function() {
      this.epicSelectionDialogOpen = !this.epicSelectionDialogOpen;
    },
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
      if (event.target.name === 'type') {
        this.$emit('typeChange', event);
      }
    },
    handleDescriptionChange: function(text) {
      this.data.description = text;
    },
    handleParentTaskChange: function(value) {
      this.data.parentTaskId = value;
      this.toggleParentSelectionDialogOpen();
    },
    handleEpicChange: function(value) {
      this.data.epic = value;
      this.toggleEpicSelectionDialogOpen();
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
    save: function() {
      this.saveTask(this.data);
    },
  },
};
</script>
<style lang="scss" scoped>
.view-details {
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;
  .one-line-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
  .section {
    display: flex;
    flex-direction: column;
    padding: 20px 10px;

    .parent-task,
    .epic {
      padding: 20px 0;
      display: grid;
      grid-auto-flow: column;
      justify-content: flex-start;
      column-gap: 20px;

      .parent-task-link,
      .epic-link {
        user-select: none;
        margin-left: 10px;
        cursor: pointer;
        text-decoration: underline;
        color: var(--color-primary-1);
        &:hover {
          color: var(--color-primary-2);
        }
      }
    }
    // &.dense-container {
    //   @media (min-width: 768px) {
    //     display: grid;
    //     grid-template-columns: 1fr 1fr;
    //     column-gap: 100px;
    //   }
    // }
  }
  .hr {
    height: 1px;
    width: 60%;
    background-color: var(--color-background-5);
    margin: auto;
  }
  .action {
    display: flex;
    justify-content: center;
  }
}
</style>

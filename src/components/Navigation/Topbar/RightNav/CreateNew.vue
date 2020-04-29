<template>
  <div>
    <OakPopoverMenu
      v-bind:elements="elements"
      data="option 1"
      id="create new"
      label="Create new"
      iconLeft="playlist_add"
      theme="secondary"
      labelVariant="on"
      right
      mobilize
    />
    <OakModal
      @close="toggleProject"
      v-bind:visible="newProject"
      label="New Project"
    >
      <div slot="modal-body">
        <UpdateProject v-bind:project="projectStub" />
      </div>
    </OakModal>
    <OakModal @close="toggleStage" v-bind:visible="newStage" label="New Stage">
      <div slot="modal-body">
        <UpdateStage v-bind:stage="stageStub" />
      </div>
    </OakModal>
    <OakModal @close="toggleTeam" v-bind:visible="newTeam" label="New Team">
      <div slot="modal-body">
        <UpdateTeam v-bind:team="teamStub" />
      </div>
    </OakModal>
    <OakModal @close="toggleTask" v-bind:visible="newTask" label="New Task">
      <div slot="modal-body">
        <UpdateTask v-bind:task="taskStub" />
      </div>
    </OakModal>
  </div>
</template>
<script>
import UpdateProject from '@/components/Create/UpdateProject.vue';
import UpdateTask from '@/components/Create/UpdateTask.vue';
import UpdateStage from '@/components/Create/UpdateStage.vue';
import UpdateTeam from '@/components/Create/UpdateTeam.vue';
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';
import OakModal from '@/oakui/OakModal.vue';

const projectStub = {
    name: '',
    type: 'Kanban',
  },
  teamStub = {
    name: '',
    members: [],
  },
  stageStub = {
    projectId: '',
    stageId: '',
    name: '',
  },
  taskStub = {
    stageId: '',
    type: 'Story',
    title: '',
    description: '',
    priority: '',
    assignedTo: null,
    parentTaskId: null,
    projectId: '',
  };

export default {
  name: 'CreateNew',
  components: {
    OakPopoverMenu,
    UpdateProject,
    UpdateTask,
    UpdateTeam,
    UpdateStage,
    OakModal,
  },
  data: function() {
    return {
      newProject: false,
      newStage: false,
      newTask: false,
      newTeam: false,
      projectStub: projectStub,
      teamStub: teamStub,
      stageStub: stageStub,
      taskStub: taskStub,
      elements: [
        {
          label: 'Task',
          action: this.toggleTask,
          icon: 'library_add_check',
        },
        {
          label: 'Project',
          action: this.toggleProject,
          icon: 'apps',
        },
        {
          label: 'Team',
          action: this.toggleTeam,
          icon: 'people_alt',
        },
        {
          label: 'Stage / Lane',
          action: this.toggleStage,
          icon: 'vertical_split',
        },
      ],
    };
  },
  methods: {
    toggleProject: function() {
      this.projectStub = { ...this.projectStub, projectStub };
      this.newProject = !this.newProject;
    },
    toggleTask: function() {
      this.taskStub = { ...this.taskStub, taskStub };
      this.newTask = !this.newTask;
    },
    toggleStage: function() {
      this.stageStub = { ...this.stageStub, ...stageStub };
      this.newStage = !this.newStage;
    },
    toggleTeam: function() {
      this.teamStub = { ...this.teamStub, ...teamStub };
      this.newTeam = !this.newTeam;
    },
  },
};
</script>
<style lang="scss" scoped></style>

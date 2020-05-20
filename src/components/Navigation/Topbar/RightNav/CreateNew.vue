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
      icon="apps"
    >
      <div slot="modal-body">
        <UpdateProject v-bind:project="projectStub" @success="toggleProject" />
      </div>
    </OakModal>
    <OakModal
      @close="toggleStage"
      v-bind:visible="newStage"
      label="New Stage"
      icon="vertical_split"
    >
      <div slot="modal-body">
        <UpdateStage v-bind:stage="stageStub" @success="toggleStage" />
      </div>
    </OakModal>
    <OakModal
      @close="toggleTeam"
      v-bind:visible="newTeam"
      label="New Team"
      icon="people_alt"
    >
      <div slot="modal-body">
        <UpdateTeam v-bind:team="teamStub" @success="toggleTeam" />
      </div>
    </OakModal>
    <NewTask
      v-bind:task="taskStub"
      @success="toggleTask"
      v-bind:visible="newTask"
      @toggle="toggleTask"
    />
  </div>
</template>
<script>
import UpdateProject from '@/components/Create/UpdateProject.vue';
import NewTask from '@/components/Create/NewTask.vue';
import UpdateStage from '@/components/Create/UpdateStage.vue';
import UpdateTeam from '@/components/Create/UpdateTeam.vue';
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';
import OakModal from '@/oakui/OakModal.vue';

const projectStub = {
    name: '',
    type: 'Kanban',
    estimationMetric: 'Story points',
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
    assignedTo: [],
    parentTaskId: null,
    projectId: '',
    timeEstimate: 0,
    storyPoints: 0,
    status: 'open',
  };
import { mapGetters } from 'vuex';
export default {
  name: 'CreateNew',
  components: {
    OakPopoverMenu,
    UpdateProject,
    NewTask,
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
  computed: {
    ...mapGetters(['getProject']),
  },
  methods: {
    toggleProject: function() {
      this.projectStub = { ...this.projectStub, ...projectStub };
      this.newProject = !this.newProject;
    },
    toggleTask: function() {
      this.taskStub = {
        ...taskStub,
        assignedTo: [],
        projectId: this.getProject?._id,
      };
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

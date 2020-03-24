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
    <UpdateProject
      @close="toggleProject"
      v-bind:visible="newProject"
      v-bind:project="projectStub"
      v-bind:alwaysEditFields="['name', 'type']"
    />
    <UpdateStage
      @close="toggleStage"
      v-bind:visible="newStage"
      v-bind:stage="stageStub"
      v-bind:alwaysEditFields="['name', 'projectId']"
    />
    <UpdateTeam
      @close="toggleTeam"
      v-bind:visible="newTeam"
      v-bind:team="teamStub"
      v-bind:alwaysEditFields="['name']"
    />
    <UpdateTask
      @close="toggleTask"
      v-bind:visible="newTask"
      v-bind:task="taskStub"
      v-bind:alwaysEditFields="[
        'projectId',
        'stageId',
        'type',
        'title',
        'description',
        'priority',
        'assignedTo',
      ]"
    />
  </div>
</template>
<script>
import UpdateProject from '@/components/Create/UpdateProject.vue';
import UpdateTask from '@/components/Create/UpdateTask.vue';
import UpdateStage from '@/components/Create/UpdateStage.vue';
import UpdateTeam from '@/components/Create/UpdateTeam.vue';
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';

export default {
  name: 'CreateNew',
  data: function() {
    return {
      newProject: false,
      newStage: false,
      newTask: false,
      newTeam: false,
      projectStub: {
        name: '',
        type: 'Kanban',
      },
      teamStub: {
        name: '',
        members: [],
      },
      stageStub: {
        projectId: '',
        stageId: '',
        name: '',
      },
      taskStub: {
        stageId: '',
        type: 'Story',
        title: '',
        description: '',
        priority: '',
        assignedTo: null,
        parentTaskId: null,
        projectId: '',
      },
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
  components: {
    OakPopoverMenu,
    UpdateProject,
    UpdateTask,
    UpdateStage,
    UpdateTeam,
  },
  methods: {
    toggleProject: function() {
      this.newProject = !this.newProject;
    },
    toggleTask: function() {
      this.newTask = !this.newTask;
    },
    toggleStage: function() {
      this.newStage = !this.newStage;
    },
    toggleTeam: function() {
      this.newTeam = !this.newTeam;
    },
  },
};
</script>
<style lang="scss" scoped></style>

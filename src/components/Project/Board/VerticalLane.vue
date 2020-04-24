<template>
  <div>
    <div class="lane-vertical" @dragover.prevent @drop.prevent="drop">
      <div class="stage typography-4 space-bottom-2">
        <div class="stage-name">{{ stage.name }}</div>
        <div class="stage-actions">
          <div @click="toggleTask">
            <i class="material-icons">add</i>
          </div>
        </div>
      </div>
      <div class="container" v-bind:class="isDragging ? 'dragging' : ''">
        <div
          v-for="task in tasks"
          v-bind:key="task.id"
          v-bind:id="task.id"
          draggable="true"
        >
          <Card v-bind:task="task" />
        </div>
      </div>
    </div>
    <OakModal @close="toggleTask" v-bind:visible="newTask" label="New Task">
      <div slot="modal-container">
        <UpdateTask v-bind:task="taskStub" />
      </div>
    </OakModal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Card from './Card';
import { receiveMessage } from '@/events/MessageService';
import UpdateTask from '@/components/Create/UpdateTask.vue';
import OakModal from '@/oakui/OakModal.vue';

export default {
  name: 'VerticalLane',
  components: {
    OakModal,
    Card,
    UpdateTask,
  },
  props: {
    stage: Object,
  },
  data: function() {
    return {
      isDragging: false,
      newTask: false,
      taskStub: {
        stageId: this.stage._id,
        type: 'Story',
        title: '',
        description: '',
        priority: '',
        assignedTo: null,
        parentTaskId: null,
        projectId: '',
      },
    };
  },
  methods: {
    drop(e) {
      // const id = e.dataTransfer.getData('id');
      // console.log(id);
      // const listItem = document.getElementById(id);
      // listItem.style.display = 'block';
      // e.target.appendChild(listItem);
    },
    toggleTask: function() {
      this.newTask = !this.newTask;
      this.taskStub = { ...this.taskStub, projectId: this.getProject._id };
    },
  },
  computed: {
    ...mapGetters(['getTasksByStage', 'getProject']),
    tasks: function() {
      const taskList = this.getTasksByStage(this.stage._id);
      return taskList;
    },
  },
  created() {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'dragging') {
        this.isDragging = message.signal;
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.lane-vertical {
  width: 300px;
  margin-left: 50px;
  margin-top: 50px;
  // padding: 6px;
  .container {
    height: 75vh;
    overflow-y: auto;
    &.dragging {
      overflow-y: hidden;
    }
  }

  .stage {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 32px;
    line-height: 32px;
    .stage-actions {
      display: none;
      cursor: pointer;
      .material-icons {
        line-height: 32px;
      }
    }
    &:hover {
      .stage-actions {
        display: block;
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="lane-vertical">
      <div
        class="header typography-4 space-bottom-2"
        draggable="true"
        @dragover.prevent="dragOver"
        @dragstart="dragStart"
        @dragend="dragEnd"
        @drop.prevent="drop"
        @dragleave="dragLeave"
      >
        <div class="stage-name" @click="toggleStage">{{ stage.name }}</div>
        <div class="header-actions">
          <!-- <div @click="toggleTask">
            <i class="material-icons">add</i>
          </div> -->
          <div @click="toggleTask">
            <i class="material-icons">add</i>
          </div>
        </div>
      </div>
      <div class="container" v-bind:class="isDragging ? 'dragging' : ''">
        <template v-if="tasks.length > 0">
          <div v-for="task in tasks" v-bind:key="task.id" v-bind:id="task.id">
            <Card v-bind:task="task" />
          </div>
        </template>
        <div v-else>
          <EmptyPlaceholderCard v-bind:stage="stage" />
        </div>
      </div>
    </div>
    <OakModal @close="toggleTask" v-bind:visible="newTask" label="New Task">
      <div slot="modal-body">
        <NewTask v-bind:task="taskStub" />
      </div>
    </OakModal>
    <OakModal
      @close="toggleStage"
      v-bind:visible="editStage"
      label="Edit Stage"
    >
      <div slot="modal-body">
        <UpdateStage v-bind:stage="stage" @success="toggleStage" />
      </div>
    </OakModal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Card from './Card';
import { receiveMessage, sendMessage } from '@/events/MessageService';
import NewTask from '@/components/Create/NewTask.vue';
import UpdateStage from '@/components/Create/UpdateStage.vue';
import OakModal from '@/oakui/OakModal.vue';
import EmptyPlaceholderCard from './EmptyPlaceholderCard.vue';

export default {
  name: 'VerticalLane',
  components: {
    OakModal,
    Card,
    NewTask,
    UpdateStage,
    EmptyPlaceholderCard,
  },
  props: {
    stage: Object,
    sortCriteria: Object,
    searchCriteria: Object,
  },
  data: function() {
    return {
      isDragging: false,
      newTask: false,
      editStage: false,
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
    ...mapActions(['moveStage', 'saveTask']),
    toggleTask: function() {
      this.newTask = !this.newTask;
      this.taskStub = { ...this.taskStub, projectId: this.getProject._id };
    },
    toggleStage: function() {
      this.editStage = !this.editStage;
    },
    dragStart(e) {
      this.dragClass = 'source-spot';
      e.dataTransfer.setData('id', this.stage._id);
      e.dataTransfer.setData('domain', 'stage');
      setTimeout(() => {
        // e.target.style.display = 'none';
        console.log('here you can set display as none');
      }, 0);
    },
    dragEnd() {
      this.dragClass = '';
      sendMessage('dragging', false);
    },
    dragOver(e) {
      this.dragClass =
        this.dragClass === 'source-spot' ? this.dragClass : 'destination-spot';
      if (
        (this.getProfile.sidebar && e.screenX <= 250 + 20) ||
        (!this.getProfile.sidebar && e.screenX <= 20)
      ) {
        sendMessage('dragging');
      }
      if (e.screenX > window.innerWidth * window.devicePixelRatio - 20) {
        sendMessage('dragging');
      }
    },
    dragLeave(e) {
      this.dragClass =
        this.dragClass === 'destination-spot' ? '' : this.dragClass;
    },
    drop(e) {
      const type = e.dataTransfer.getData('domain');
      const id = e.dataTransfer.getData('id');
      this.dragClass = '';
      if (type === 'task') {
        const task = this.getTaskById(id);
        this.saveTask({ ...task, stageId: this.stage._id });
      } else if (type === 'stage') {
        this.moveStage({ moveStageId: id, afterStageId: this.stage._id });
      }

      // const listItem = document.getElementById(id);
      // listItem.style.display = 'block';
      // e.target.appendChild(listItem);
    },
  },
  computed: {
    ...mapGetters([
      'getTasksByStageSorted',
      'getTaskById',
      'getProject',
      'getProfile',
    ]),
    tasks: function() {
      const taskList = this.getTasksByStageSorted(
        this.stage._id,
        this.sortCriteria,
        this.searchCriteria
      );
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
    height: 70vh;
    overflow-y: auto;
    &.dragging {
      overflow-y: hidden;
    }
  }

  .header {
    user-select: none;
    display: grid;
    grid-template-columns: 1fr auto;
    height: 32px;
    line-height: 32px;
    background-color: var(--color-background-transparent-4);
    border-radius: 4px;
    padding: 4px 10px;
    .stage-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .header-actions {
      cursor: pointer;
      .material-icons {
        line-height: 32px;
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="lane-vertical" v-bind:class="showFilterBar ? 'filter-on' : ''">
      <div
        class="header typography-4"
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
          <EmptyPlaceholderCard
            v-bind:stage="stage"
            v-bind:showFilterBar="showFilterBar"
          />
        </div>
      </div>
    </div>
    <NewTask
      v-bind:task="taskStub"
      v-bind:visible="newTask"
      @toggle="toggleTask"
      @success="toggleTask"
    />
    <OakModal
      @close="toggleStage"
      v-bind:visible="editStage"
      label="Edit Stage"
      icon="edit"
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
    searchCriteria: Array,
    showFilterBar: Boolean,
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
        assignedTo: [],
        parentTaskId: null,
        projectId: '',
        timeEstimate: 0,
        storyPoints: 0,
        status: 'open',
      },
    };
  },
  methods: {
    ...mapActions(['moveStage', 'saveTask']),
    toggleTask: function() {
      this.newTask = !this.newTask;
      this.taskStub = {
        ...this.taskStub,
        projectId: this.getProject._id,
        assignedTo: [],
      };
    },
    toggleStage: function() {
      this.editStage = !this.editStage;
    },
    dragStart(e) {
      this.dragClass = 'source-spot';
      e.dataTransfer.setData('id', this.stage._id);
      e.dataTransfer.setData('domain', 'stage');
      // setTimeout(() => {
      //   // e.target.style.display = 'none';
      //   console.log('here you can set display as none');
      // }, 0);
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
  margin-top: 20px;
  // padding: 6px;
  .container {
    // top bar = 60px
    // toolbar = 50px
    // margin above lane title = 20px
    // lane name height = 32px
    // vertical padding on lane name = 2px
    // margin below lane name = 20px
    // self padding bottom = 20px
    height: calc(100vh - 60px - 50px - 20px - 32px - 2px - 20px - 20px);
    overflow-y: auto;
    &.dragging {
      overflow-y: hidden;
    }
  }

  &.filter-on {
    .container {
      height: calc(
        100vh - 60px - 50px - 20px - 32px - 2px - 20px - 20px - 50px
      );
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
    padding: 1px 4px;
    margin-bottom: 20px;
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

<template>
  <div class="lane-horizontal">
    <div
      class="stage typography-4"
      v-bind:class="isExpanded ? 'show' : 'hide'"
      @click="toggle"
      draggable="true"
      @dragover.prevent="dragOver"
      @dragstart="dragStart"
      @dragend="dragEnd"
      @drop.prevent="drop"
      @dragleave="dragLeave"
    >
      <i
        class="material-icons"
        v-bind:class="isExpanded ? 'showless' : 'showmore'"
        >expand_more</i
      >
      {{ stage.name }}
    </div>
    <div
      class="container"
      v-bind:class="isExpanded ? 'show' : 'hide'"
      ref="container"
    >
      <template v-if="tasks.length > 0">
        <div v-for="task in tasks" v-bind:key="task.id" v-bind:id="task.id">
          <ListItem v-bind:task="task" />
        </div>
      </template>
      <div v-else>
        <EmptyListItem v-bind:stage="stage" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListItem from './ListItem.vue';
import EmptyListItem from './EmptyListItem.vue';
import { sendMessage } from '../../../events/MessageService';

export default {
  name: 'HorizontalLane',
  components: {
    ListItem,
    EmptyListItem,
  },
  props: {
    stage: Object,
    sortCriteria: Object,
    searchCriteria: Array,
  },
  data: function() {
    return {
      isExpanded: true,
    };
  },
  mounted() {
    this.updateScrollHeight();
  },
  methods: {
    ...mapActions(['moveStage', 'saveTask']),
    toggle: function() {
      this.isExpanded = !this.isExpanded;
    },
    updateScrollHeight: function() {
      setTimeout(() => {
        if (this.isExpanded) {
          this.$refs.container.style.maxHeight =
            this.$refs.container.scrollHeight + 'px';
        } else {
          this.$refs.container.style.maxHeight = 0 + 'px';
        }
      }, 0);
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
    },
  },
  watch: {
    tasks: function() {
      this.updateScrollHeight();
    },
    isExpanded: function() {
      this.updateScrollHeight();
    },
  },
  computed: {
    ...mapGetters(['getTasksByStageSorted', 'getTaskById']),
    tasks: function() {
      const taskList = this.getTasksByStageSorted(
        this.stage._id,
        this.sortCriteria,
        this.searchCriteria
      );
      return taskList;
    },
  },
};
</script>
<style lang="scss" scoped>
.lane-horizontal {
  padding-bottom: 10px;
  user-select: none;
  .container {
    // margin-left: 20px;
    overflow-y: hidden;
    transition: max-height 250ms ease-in-out;
  }
  .stage {
    height: 60px;
    line-height: 60px;
    &.show {
      border-bottom: 1px solid var(--color-background-3);
    }
    color: var(--color-foreground-2);
    font-size: 0.9em;
    .material-icons {
      line-height: 60px;
      vertical-align: middle;
      cursor: pointer;
      transition: transform 250ms ease-in-out;
      &.showless {
        transform: scaleY(-1);
      }
    }
  }
}
</style>

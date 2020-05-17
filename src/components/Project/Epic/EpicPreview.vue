<template>
  <div class="epic-preview">
    <div class="left">
      <div @click="openEpicDetailed">
        <div class="task-id typography-7">{{ epic.taskId }}</div>
      </div>
      <div class="task-type-row">
        <div v-if="taskTypeMap['Task'].remaining > 0" class="task-type-badge">
          <TaskTypeBadge type="Task" />
          <div>{{ taskTypeMap['Task'].remaining }}</div>
        </div>
        <div
          v-if="taskTypeMap['Sub-task'].remaining > 0"
          class="task-type-badge"
        >
          <TaskTypeBadge type="Sub-task" />
          <div>{{ taskTypeMap['Sub-task'].remaining }}</div>
        </div>
        <div v-if="taskTypeMap['Defect'].remaining > 0" class="task-type-badge">
          <TaskTypeBadge type="Defect" />
          <div>{{ taskTypeMap['Defect'].remaining }}</div>
        </div>
        <div v-if="taskTypeMap['Story'].remaining > 0" class="task-type-badge">
          <TaskTypeBadge type="Story" />
          <div>{{ taskTypeMap['Story'].remaining }}</div>
        </div>
      </div>
      <div class="task-type-row">
        <div v-if="taskTypeMap['Task'].total > 0" class="task-type-badge">
          <TaskTypeBadge type="Task" color="var(--color-background-5)" />
          <div class="task-count-disabled">{{ taskTypeMap['Task'].total }}</div>
        </div>
        <div v-if="taskTypeMap['Sub-task'].total > 0" class="task-type-badge">
          <TaskTypeBadge type="Sub-task" color="var(--color-background-5)" />
          <div class="task-count-disabled">
            {{ taskTypeMap['Sub-task'].total }}
          </div>
        </div>
        <div v-if="taskTypeMap['Defect'].total > 0" class="task-type-badge">
          <TaskTypeBadge type="Defect" color="var(--color-background-5)" />
          <div class="task-count-disabled">
            {{ taskTypeMap['Defect'].total }}
          </div>
        </div>
        <div v-if="taskTypeMap['Story'].total > 0" class="task-type-badge">
          <TaskTypeBadge type="Story" color="var(--color-background-5)" />
          <div class="task-count-disabled">
            {{ taskTypeMap['Story'].total }}
          </div>
        </div>
      </div>
      <div class="estimation typography-4">
        <div>Original time estimate - {{ estimate.total }}</div>
        <div>Remaining time estimate - {{ estimate.remaining }}</div>
      </div>
      <div>{{ epic.title }}</div>
      <div class="three-liner">{{ toPlainText(epic.description) }}</div>
    </div>
    <div class="right">
      <TaskStatusBadge v-bind:status="epic.status" showOpen />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import TaskTypeBadge from '../Task/TaskTypeBadge.vue';
import TaskStatusBadge from '../Task/TaskStatusBadge.vue';
import { htmlToText } from '../../../Utils';
export default {
  name: 'EpicPreview',
  props: { epic: Object },
  components: { TaskTypeBadge, TaskStatusBadge },
  computed: {
    ...mapGetters(['getSubtasksByTaskId', 'getProjectById', 'getProfile']),
    estimate: function() {
      let total = 0;
      let remaining = 0;
      if (
        this.getProjectById(this.epic.projectId).estimationMetric ===
        'Time estimate'
      ) {
        this.getSubtasksByTaskId(this.epic._id).forEach(item => {
          total += item.timeEstimate || 0;
          if (item.status === 'open') {
            remaining += item.timeEstimate || 0;
          }
        });
        return { total: total + ' hrs', remaining: remaining + ' hrs' };
      } else {
        this.getSubtasksByTaskId(this.epic._id).forEach(item => {
          total += item.storyPoints || 0;
          if (item.status === 'open') {
            remaining += item.storyPoints || 0;
          }
        });
        return { total: total + ' pts', remaining: remaining + ' pts' };
      }
    },
    taskTypeMap: function() {
      const result = {
        Task: { total: 0, remaining: 0 },
        'Sub-task': { total: 0, remaining: 0 },
        Defect: { total: 0, remaining: 0 },
        Story: { total: 0, remaining: 0 },
        Total: { total: 0, remaining: 0 },
      };
      this.getSubtasksByTaskId(this.epic._id).forEach(item => {
        result[item.type].total += 1;
        result.Total.total += 1;
        if (item.status === 'open') {
          result[item.type].remaining += 1;
          result.Total.remaining += 1;
        }
      });
      return result;
    },
  },
  methods: {
    toPlainText: function(text) {
      return htmlToText(text);
    },
    openEpicDetailed: function() {
      console.log('open');
      this.$router.push({
        path: `/${this.getProfile.space}/${this.epic.projectId}/dashboard`,
        query: { view: 'task', taskid: this.epic.taskId },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.epic-preview {
  background-color: var(--color-background-4);
  padding: 10px 10px;
  display: grid;
  grid-template-columns: 1fr auto;
  border-radius: 6px;
  .left {
    display: grid;
    grid-auto-flow: row;
    row-gap: 4px;
    .task-id {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .task-type-row {
      display: grid;
      grid-auto-flow: column;
      justify-content: flex-start;
      column-gap: 6px;
      .task-type-badge {
        display: flex;
        align-items: center;

        .task-count-disabled {
          color: var(--color-background-5);
        }
      }
    }
  }
}
</style>

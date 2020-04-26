<template>
  <div class="view-subtask">
    <div v-for="item in subtasks" v-bind:key="item._id">
      <SubtaskRow v-bind:subtask="item" />
    </div>
    <div class="create-sub-task" v-if="data.showNew">
      <div class="typography-4">Type</div>
      <div>
        <OakSelect
          v-bind:data="data.type"
          id="type"
          @change="handleChange"
          v-bind:elements="['Task', 'Sub-task', 'Defect']"
        />
      </div>
      <div class="typography-4">Title</div>
      <OakText id="title" v-bind:data="data.title" @change="handleChange" />
      <div class="typography-4">Description</div>
      <OakText
        id="description"
        v-bind:data="data.description"
        @change="handleChange"
        multiline
        v-bind:rows="10"
      />
    </div>
    <div class="action">
      <OakButton
        v-if="data.showNew"
        theme="primary"
        variant="animate in"
        @click="save"
        label="Save Sub-task"
      />
      <OakButton
        v-if="!data.showNew"
        theme="primary"
        variant="animate in"
        @click="toggle"
        label="Create Sub-task"
      />
      <OakButton
        v-if="data.showNew"
        theme="primary"
        variant="animate in"
        @click="toggle"
        label="Cancel"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakButton from '@/oakui/OakButton.vue';
import OakText from '@/oakui/OakText.vue';
import OakSelect from '@/oakui/OakSelect.vue';
import SubtaskRow from './SubtaskRow.vue';

export default {
  name: 'ViewSubtask',
  components: { OakButton, OakText, OakSelect, SubtaskRow },
  props: { task: Object },
  data: function() {
    return {
      data: {
        showNew: false,
        title: '',
        description: '',
        type: 'Task',
      },
    };
  },
  computed: {
    ...mapGetters(['getSubtasksByTaskId']),
    subtasks: function() {
      return this.task ? this.getSubtasksByTaskId(this.task._id) : [];
    },
  },
  methods: {
    ...mapActions(['saveTask']),
    toggle: function() {
      this.data.showNew = !this.data.showNew;
      this.data = { ...this.data, title: '', description: '', type: 'Task' };
      this.$emit('viewUpdated');
    },
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
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
  .create-sub-task {
    display: grid;
    grid-template-columns: auto 1fr;
    row-gap: 20px;
    column-gap: 20px;
  }
}
</style>

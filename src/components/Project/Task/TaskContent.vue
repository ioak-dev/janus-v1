<template>
  <div class="task-content">
    <OakTab class="task-tab" v-bind:meta="tabDetails">
      <div slot="details">
        <div class="content" slot="content">
          <div class="typography-4">Task Reference</div>
          <div class="typography-4">
            {{ task ? task.taskId : '' }}
          </div>
          <div class="typography-4">Parent</div>
          <div class="typography-4">
            {{
              task && task.parentTaskId
                ? getTaskById(task.parentTaskId).taskId
                : ''
            }}
          </div>
          <div class="typography-4">Title</div>
          <div class="title-section">
            <OakInplaceEdit
              v-bind:data="data"
              id="title"
              @blur="handleChange"
            />
          </div>
          <div class="typography-4">Type</div>
          <div>
            <ClickAndEditSelect
              v-bind:data="data"
              id="type"
              v-bind:alwaysEditFields="alwaysEditFields"
              v-bind:elements="['Epic', 'Story', 'Task', 'Sub-Task', 'Bug']"
              @change="handleChange"
            />
          </div>
          <div class="typography-4">Stage</div>
          <ClickAndEditSelect
            v-bind:data="data"
            id="stageId"
            v-bind:alwaysEditFields="alwaysEditFields"
            v-bind:objects="stageDropDown"
            @change="handleChange"
          />
          <div class="typography-4">Priority</div>
          <ClickAndEditSelect
            v-bind:data="data"
            id="priority"
            v-bind:alwaysEditFields="alwaysEditFields"
            v-bind:elements="['Could have', 'Should have', 'Must have']"
            @change="handleChange"
          />
          <div class="typography-4">Assigned to</div>
          <Assignee
            v-bind:id="data.assignedTo"
            @remove="clearAssignee"
            @change="handleAssigneeChange"
            v-bind:teamIdList="teamIdList"
          />
        </div>
      </div>
      <div slot="description">
        <div class="content single-column" slot="content">
          <OakEditor
            id="task-description"
            v-bind:data="data.description"
            @change="handleDescriptionChange"
          />
        </div>
      </div>
      <div slot="checklist">
        <div class="content single-column" slot="content">
          <ViewChecklist
            v-bind:task="task"
            @viewUpdated="$emit('viewUpdated')"
          />
        </div>
      </div>
      <div slot="subtask">
        <div class="content single-column" slot="content">
          <ViewSubtask v-bind:task="task" @viewUpdated="$emit('viewUpdated')" />
        </div>
      </div>
      <div slot="comments">
        <div class="content single-column comments-section" slot="content">
          <div v-for="item in comments" v-bind:key="item._id">
            <ViewComment v-bind:comment="item" />
          </div>
          <OakText
            v-if="comment.showNew"
            id="text"
            v-bind:data="comment.text"
            @change="handleCommentChange"
            multiline
            v-bind:rows="10"
          />
          <div class="action">
            <OakButton
              v-if="comment.showNew"
              theme="primary"
              variant="animate in"
              @click="saveComment"
              label="Save Comment"
            />
            <OakButton
              v-if="!comment.showNew"
              theme="primary"
              variant="animate in"
              @click="toggleAddComment"
              label="Add Comment"
            />
            <OakButton
              v-if="comment.showNew"
              theme="primary"
              variant="animate in"
              @click="toggleAddComment"
              label="Cancel"
            />
          </div>
        </div>
      </div>
      <div slot="activity">
        <div class="content single-column" slot="content">
          <ViewLog v-bind:logs="logs" />
        </div>
      </div>
    </OakTab>
    <div class="action">
      <OakButton
        theme="primary"
        variant="animate in"
        @click="save"
        label="Save"
      />
    </div>
  </div>
</template>
<script>
import OakAccordion from '@/oakui/OakAccordion.vue';
import OakShowdown from '@/oakui/OakShowdown.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakTab from '@/oakui/OakTab.vue';
import OakInplaceEdit from '@/oakui/OakInplaceEdit.vue';
import OakClickAndEdit from '@/oakui/OakClickAndEdit.vue';
import OakText from '@/oakui/OakText.vue';
import OakEditor from '@/oakui/OakEditor.vue';
import ViewLog from './ViewLog.vue';
import ClickAndEditSelect from '@/components/Lib/ClickAndEditSelect.vue';
import Assignee from '@/components/Create/Assignee.vue';
import ViewComment from './ViewComment.vue';
import { mapActions, mapGetters } from 'vuex';
import ViewSubtask from './ViewSubtask.vue';
import ViewChecklist from './ViewChecklist.vue';

export default {
  name: 'TaskContent',
  components: {
    // OakShowdown,
    OakInplaceEdit,
    ClickAndEditSelect,
    Assignee,
    OakButton,
    // OakClickAndEdit,
    OakText,
    OakTab,
    OakEditor,
    ViewComment,
    ViewLog,
    ViewSubtask,
    ViewChecklist,
  },
  props: {
    task: Object,
    comments: Array,
    logs: Array,
  },
  data: function() {
    return {
      data: {
        projectId: '',
        stageId: '',
        type: '',
        priority: '',
        title: '',
        description: '',
        assignedTo: '',
      },
      comment: {
        text: '',
        showNew: false,
      },
      teamIdList: [],
      stageDropDown: [],
      alwaysEditFields: ['type', 'stageId', 'priority'],
      tabDetails: [
        { slotName: 'details', label: 'Basic details', icon: 'subject' },
        { slotName: 'description', label: 'Description', icon: 'text_fields' },
        {
          slotName: 'checklist',
          label: 'Checklist',
          icon: 'playlist_add_check',
        },
        { slotName: 'subtask', label: 'Sub task', icon: 'call_merge' },
        {
          slotName: 'comments',
          label: 'Comments',
          icon: 'chat_bubble_outline',
        },
        { slotName: 'activity', label: 'Activity', icon: 'history' },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'getProjects',
      'getStagesByProjectId',
      'getProjectById',
      'getTaskById',
    ]),
    projectDropDown: function() {
      const projectList = [];
      this.getProjects.forEach(item =>
        projectList.push({ key: item._id, value: item.name })
      );
      return projectList;
    },
  },
  created() {
    this.data = { ...this.task };
  },
  watch: {
    task: function() {
      this.data = { ...this.task };
    },
    'data.projectId': function(newProjectId, oldProjectId) {
      if (newProjectId && oldProjectId !== newProjectId) {
        this.fetchStageDropdown();
        this.teamIdList = this.getProjectById(newProjectId).teamIdList;
      }
    },
  },
  methods: {
    ...mapActions(['saveTask', 'saveTaskComment']),
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    handleCommentChange: function() {
      this.comment[event.target.name] = event.target.value;
    },
    handleDescriptionChange: function(text) {
      this.data.description = text;
    },
    fetchStageDropdown: function() {
      const stageList = [];
      this.getStagesByProjectId(this.data.projectId).forEach(item =>
        stageList.push({ key: item._id, value: item.name })
      );
      this.stageDropDown = stageList;
    },
    save: function() {
      this.saveTask(this.data);
    },
    saveComment: function() {
      this.saveTaskComment({ taskId: this.task._id, text: this.comment.text });
      this.toggleAddComment();
    },
    clearAssignee: function() {
      this.data.assignedTo = '';
    },
    handleAssigneeChange: function(key) {
      this.data.assignedTo = key;
    },
    toggleAddComment: function() {
      this.comment.showNew = !this.comment.showNew;
      this.comment.text = '';
    },
  },
};
</script>
<style lang="scss" scoped>
.task-content {
  margin: 20px;
  display: grid;
  grid-template-rows: auto;
  row-gap: 10px;
  .task-tab {
    background-color: var(--color-background-4);
    border-radius: 4px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    .content {
      background-color: var(--color-background-transparent-4);
      padding: 20px 10px;
      // margin: 50px;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      row-gap: 20px;
      column-gap: 20px;
      &.single-column {
        padding: 20px 10px;
        display: grid;
        grid-template-columns: auto;
      }
    }
  }
}
</style>

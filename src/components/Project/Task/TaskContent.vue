<template>
  <div class="task-content">
    <OakTab class="task-tab" v-bind:meta="tabDetails">
      <div slot="details">
        <div class="content single-column" slot="content">
          <ViewDetails v-bind:task="task" @typeChange="handleChange" />
        </div>
      </div>
      <div slot="attachments">
        <div class="content single-column" slot="content">
          <Attachment v-bind:task="task" />
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
          <div v-for="item in getCommentsForTask" v-bind:key="item._id">
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
              variant="appear"
              @click="saveComment"
              label="Save Comment"
            />
            <OakButton
              v-if="!comment.showNew"
              theme="primary"
              variant="appear"
              @click="toggleAddComment"
              label="Add Comment"
            />
            <OakButton
              v-if="comment.showNew"
              theme="primary"
              variant="appear"
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
  </div>
</template>
<script>
import OakButton from '@/oakui/OakButton.vue';
import OakTab from '@/oakui/OakTab.vue';
import OakText from '@/oakui/OakText.vue';
import ViewLog from './ViewLog.vue';
import ViewComment from './ViewComment.vue';
import Attachment from './Attachment.vue';
import { mapActions, mapGetters } from 'vuex';
import ViewSubtask from './ViewSubtask.vue';
import ViewChecklist from './ViewChecklist.vue';
import ViewDetails from './ViewDetails.vue';

export default {
  name: 'TaskContent',
  components: {
    OakButton,
    OakText,
    OakTab,
    ViewDetails,
    ViewComment,
    ViewLog,
    ViewSubtask,
    ViewChecklist,
    Attachment,
  },
  props: {
    task: Object,
  },
  data: function() {
    return {
      data: {
        type: '',
      },
      comment: {
        text: '',
        showNew: false,
      },
      alwaysEditFields: ['type', 'stageId', 'priority'],
      tabDetailsMaster: [
        { slotName: 'details', label: 'Basic details', icon: 'subject' },
        { slotName: 'attachments', label: 'Attachments', icon: 'attach_file' },
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
      'getLogs',
      'getCommentsForTask',
    ]),
    projectDropDown: function() {
      const projectList = [];
      this.getProjects.forEach(item =>
        projectList.push({ key: item._id, value: item.name })
      );
      return projectList;
    },
    logs: function() {
      return this.getLogs('Task');
    },
    tabDetails: function() {
      if (['Task', 'Story', 'Epic'].includes(this.data.type)) {
        return this.tabDetailsMaster;
      } else {
        return this.tabDetailsMaster.filter(
          item => !['subtask'].includes(item.slotName)
        );
      }
    },
  },
  mounted() {
    this.postTaskUpdateAction(this.task);
  },
  watch: {
    task: function() {
      this.postTaskUpdateAction(this.task);
    },
  },
  methods: {
    ...mapActions([
      'saveTask',
      'saveTaskComment',
      'fetchTaskComments',
      'fetchTaskChecklistitems',
      'fetchLogs',
    ]),
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    handleCommentChange: function() {
      this.comment[event.target.name] = event.target.value;
    },
    handleDescriptionChange: function(text) {
      this.data.description = text;
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
    postTaskUpdateAction: function(task) {
      this.data = { ...task };
      if (this.task) {
        this.fetchTaskComments(this.task._id);
        this.fetchTaskChecklistitems(this.task._id);
        this.fetchLogs({ domain: 'Task', reference: this.task._id });
      }
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
    background-color: var(--color-background-2);
    border-radius: 4px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    .content {
      // background-color: var(--color-background-transparent-4);
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

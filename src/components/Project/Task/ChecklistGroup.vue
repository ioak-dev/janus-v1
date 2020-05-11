<template>
  <!-- <OakAccordion collapseOthers> -->
  <div class="checklist-group">
    <div class="group-label">
      <OakInplaceEdit
        id="groupName"
        v-bind:data="data"
        @blur="changeGroup"
        nopad
      />
      <div class="task-count">
        {{ completedTasksCount }}/{{ getChecklistItemsByGroup(group).length }}
        <template
          v-if="completedTasksCount === getChecklistItemsByGroup(group).length"
        >
          <i class="material-icons complete">check_circle</i>
        </template>
        <template
          v-if="
            completedTasksCount !== getChecklistItemsByGroup(group).length &&
              completedTasksCount > 0
          "
        >
          <i class="material-icons started">play_circle_filled</i>
        </template>
        <template
          v-if="
            completedTasksCount !== getChecklistItemsByGroup(group).length &&
              completedTasksCount === 0
          "
        >
          <i class="material-icons notstarted">play_circle_outline</i>
        </template>
      </div>
    </div>
    <div class="content">
      <div
        class="checklist-item"
        v-for="item in getChecklistItemsByGroup(group)"
        v-bind:key="item._id"
      >
        <div>
          <OakCheckbox
            v-bind:id="'checkbox-' + item._id"
            theme="default"
            variant="circle"
            v-bind:data="item.isComplete"
            @change="toggleCheck(item)"
          />
        </div>
        <div
          class="checklist-item-text"
          v-bind:class="item.isComplete ? 'complete' : 'not-complete'"
        >
          <OakInplaceEdit
            id="text"
            v-bind:data="item"
            @blur="changeText(item)"
          />
        </div>
        <div class="action">
          <i class="material-icons" @click="removeItem(item._id)">close</i>
        </div>
      </div>
      <div class="create-checklistitem">
        <OakText
          id="text"
          v-bind:data="data.text"
          @change="handleChange"
          label="Add new item"
          placeholder="Type to add new item"
        /><OakButton
          theme="primary"
          variant="appear"
          @click="save"
          v-if="data.text"
          label="Add"
        />
      </div>
    </div>
  </div>
  <!-- </OakAccordion> -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakCheckbox from '@/oakui/OakCheckbox.vue';
import OakInplaceEdit from '@/oakui/OakInplaceEdit.vue';

export default {
  name: 'ChecklistGroup',
  props: {
    taskId: String,
    group: String,
  },
  data: function() {
    return { data: { text: '' } };
  },
  mounted() {
    this.data = { ...this.data, groupName: this.group };
  },
  components: { OakText, OakButton, OakCheckbox, OakInplaceEdit },
  computed: {
    ...mapGetters(['getChecklistItemsByGroup']),
    completedTasksCount: function() {
      return this.getChecklistItemsByGroup(this.group).filter(
        item => item.isComplete
      ).length;
    },
  },
  methods: {
    ...mapActions(['saveTaskChecklistitem', 'deleteTaskChecklistitem']),
    save: function() {
      this.saveTaskChecklistitem({
        text: this.data.text,
        isComplete: false,
        group: this.group,
        taskId: this.taskId,
      });
      this.data.text = '';
      this.$emit('viewUpdated');
    },
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    toggleCheck: function(item) {
      this.saveTaskChecklistitem({
        ...item,
        isComplete: !!event.target.value,
      });
    },
    changeText: function(item) {
      this.saveTaskChecklistitem({
        ...item,
        text: event.target.value,
      });
    },
    changeGroup: function() {
      this.getChecklistItemsByGroup(this.group).forEach(item => {
        this.saveTaskChecklistitem({ ...item, group: event.target.value });
      });
    },
    removeItem: function(id) {
      this.deleteTaskChecklistitem({
        checklistitemId: id,
        taskId: this.taskId,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.checklist-group {
  display: grid;
  row-gap: 20px;
  .group-label {
    display: flex;
    align-items: center;
  }
  .create-checklistitem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 50px;
    @media (max-width: 767px) {
      padding: 0;
    }
  }
  .content {
    display: grid;
    grid-auto-flow: row;
    .checklist-item {
      display: flex;
      align-items: center;
      padding: 10px 50px;
      @media (max-width: 767px) {
        padding: 0;
      }
      border-bottom: 1px solid var(--color-background-2);
      .checklist-item-text {
        &.complete {
          text-decoration: line-through;
          color: var(--color-foreground-4);
        }
      }

      .action {
        visibility: hidden;
        display: flex;
        align-items: center;
        .material-icons {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
      }
      &:hover .action {
        visibility: visible;
      }
    }
  }
  .task-count {
    margin-left: 4px;
    border-radius: 4px;
    padding: 2px 6px;
    display: flex;
    align-items: center;
    background-color: var(--color-background-5);
    .material-icons {
      margin-left: 4px;
      &.complete {
        color: var(--color-success);
      }
    }
  }
}
</style>

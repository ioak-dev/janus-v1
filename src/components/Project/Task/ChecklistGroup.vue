<template>
  <OakAccordion collapseOthers>
    <div slot="label" class="group-label">
      <OakInplaceEdit
        id="groupName"
        v-bind:data="data"
        @blur="changeGroup"
        nopad
      />
      <div class="task-count">
        ({{ completedTasksCount }}/{{ getChecklistItemsByGroup(group).length }})
      </div>
    </div>
    <div slot="content">
      <div class="create-checklistitem">
        <OakText
          id="text"
          v-bind:data="data.text"
          @change="handleChange"
        /><OakButton
          theme="primary"
          variant="animate in"
          @click="save"
          label="Add"
        />
      </div>
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
      </div>
    </div>
  </OakAccordion>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakAccordion from '@/oakui/OakAccordion.vue';
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
  components: { OakText, OakButton, OakAccordion, OakCheckbox, OakInplaceEdit },
  computed: {
    ...mapGetters(['getChecklistItemsByGroup']),
    completedTasksCount: function() {
      return this.getChecklistItemsByGroup(this.group).filter(
        item => item.isComplete
      ).length;
    },
  },
  methods: {
    ...mapActions(['saveTaskChecklistitem']),
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
  },
};
</script>
<style lang="scss" scoped>
.group-label {
  display: flex;
  align-items: center;
}
.create-checklistitem {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  margin: 10px;
}
.checklist-group {
  margin: 10px;
}
.checklist-item {
  display: flex;
  align-items: center;
  padding: 10px 50px;
  border-bottom: 1px solid var(--color-background-2);
  .checklist-item-text {
    margin-left: 10px;
    &.complete {
      text-decoration: line-through;
      color: var(--color-foreground-4);
    }
  }
}
.task-count {
  margin-left: 4px;
}
</style>

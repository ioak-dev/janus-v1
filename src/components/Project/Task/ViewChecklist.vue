<template>
  <div class="view-checklist">
    <div class="create-checklistgroup">
      <OakText
        id="group"
        v-bind:data="data.group"
        label="Create new group"
        @change="handleChange"
      /><OakButton
        theme="primary"
        variant="animate in"
        v-if="data.group"
        @click="saveGroup"
        label="Create"
      />
    </div>
    <div
      v-for="key in getChecklistGroups"
      v-bind:key="key"
      class="checklist-group"
    >
      <ChecklistGroup v-bind:group="key" v-bind:taskId="task._id" />
      <div class="hr" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import ChecklistGroup from './ChecklistGroup.vue';

export default {
  name: 'ViewChecklist',
  props: { task: Object },
  components: { OakText, OakButton, ChecklistGroup },
  data: function() {
    return {
      data: { text: '', group: '' },
      groupName: 'testgroup',
    };
  },
  computed: {
    ...mapGetters(['getChecklistGroups']),
  },
  methods: {
    ...mapActions(['saveTaskChecklistitem']),
    save: function(group) {
      this.saveTaskChecklistitem({
        text: this.data.text,
        isComplete: false,
        group: group,
        taskId: this.task._id,
      });
      this.data.text = '';
      this.$emit('viewUpdated');
    },
    saveGroup: function() {
      this.data.text = 'First item';
      this.save(this.data.group);
      this.data.group = '';
    },
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
  },
};
</script>
<style lang="scss" scoped>
.view-checklist {
  display: grid;
  .create-checklistitem,
  .create-checklistgroup {
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: flex-start;
  }
  .checklist-group {
    margin-top: 10px;
    .hr {
      height: 1px;
      width: 60%;
      background-color: var(--color-background-5);
      margin: auto;
      margin-top: 20px;
      display: none;
    }
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
}
</style>

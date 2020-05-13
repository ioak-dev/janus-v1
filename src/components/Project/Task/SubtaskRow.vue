<template>
  <div class="subtask-row">
    <div>{{ subtask.taskId }}</div>
    <div>{{ subtask.type }}</div>
    <div>{{ subtask.title }}</div>
    <div class="members">
      <template v-for="(member, index) in members">
        <Avatar v-if="index < 2" v-bind:user="member" v-bind:key="member._id" />
      </template>
      <div v-if="members.length > 2" class="members-more">
        {{ `+${members.length - 2}` }}
      </div>
    </div>
    <div class="action" @click="unlink">
      <i class="material-icons">link_off</i>unlink
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Avatar from '@/components/Avatar/Avatar.vue';
export default {
  name: 'SubtaskRow',
  props: {
    subtask: Object,
  },
  components: { Avatar },
  computed: {
    ...mapGetters(['getUserById']),
    user: function() {
      return this.getUserById(this.subtask.createdBy);
    },
    members: function() {
      const memberList = [];
      this.subtask.assignedTo?.forEach(item =>
        memberList.push(this.getUserById(item))
      );
      return memberList;
    },
  },
  methods: {
    ...mapActions(['saveTask']),
    unlink: function() {
      this.saveTask({ ...this.subtask, parentTaskId: null });
    },
  },
};
</script>
<style lang="scss" scoped>
.subtask-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
  padding: 10px;
  border-bottom: 1px solid var(--color-background-2);
  align-items: center;
  .members {
    display: flex;
    align-items: center;
  }
  .members-more {
    border: 1px solid var(--color-foreground-1);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
  }
  .action {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: var(--color-primary-1);
    }
  }
}
</style>

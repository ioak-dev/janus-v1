<template>
  <div class="subtask-row">
    <div>{{ subtask.taskId }}</div>
    <div>{{ subtask.type }}</div>
    <div>{{ subtask.title }}</div>
    <div><Avatar v-bind:user="user" showName /></div>
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

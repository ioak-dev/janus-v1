<template>
  <div class="board">
    <div v-for="task in getTasks" v-bind:key="task.id">
      <TaskLink v-bind:task="task" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskLink from '../Board/TaskLink';

export default {
  name: 'Board',
  components: {
    TaskLink,
  },
  methods: {
    ...mapActions(['fetchTasks']),
  },
  computed: mapGetters(['getTasks', 'getProfile']),
  created() {
    this.fetchTasks();
  },
};
</script>
<style lang="scss" scoped>
.board {
  width: 300px;
  margin-left: 50px;
  margin-top: 50px;
  height: 80vh;
  max-height: 100vh;
  overflow-y: auto;
  // padding: 6px;
}
</style>

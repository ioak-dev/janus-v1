<template>
  <div class="board">
    <h1>Board page</h1>
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
  computed: mapGetters(['getTasks']),
  created() {
    this.fetchTasks();
  },
};
</script>

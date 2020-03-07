<template>
  <div class="lane-vertical" @drop="drop">
    <div class="category typography-5 space-bottom-2">{{ category }}</div>
    <div class="container">
      <div v-for="task in getTasks" v-bind:key="task.id" draggable="true">
        <Card v-bind:task="task" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Card from '../Board/Card';

export default {
  name: 'VerticalLane',
  components: {
    Card,
  },
  props: {
    category: String,
  },
  methods: {
    ...mapActions(['fetchTasks']),
    drop(e) {
      console.log(e.dataTransfer.getData('title'));
    },
  },
  computed: mapGetters(['getTasks', 'getProfile']),
  created() {
    this.fetchTasks();
  },
};
</script>
<style lang="scss" scoped>
.lane-vertical {
  width: 300px;
  margin-left: 50px;
  margin-top: 50px;
  // padding: 6px;
  .container {
    height: 80vh;
    overflow-y: auto;
  }
}
</style>

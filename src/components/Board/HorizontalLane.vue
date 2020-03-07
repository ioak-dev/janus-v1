<template>
  <div class="lane-horizontal" @drop="drop">
    <div class="category typography-5 space-bottom-2">{{ category }}</div>
    <div class="container">
      <div v-for="task in getTasks" v-bind:key="task.id" draggable="true">
        <ListItem v-bind:task="task" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListItem from '../Board/ListItem.vue';

export default {
  name: 'HorizontalLane',
  components: {
    ListItem,
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
.lane-horizontal {
  // width: 300px;
  // width: 100%;
  // margin-left: 50px;
  // margin-top: 50px;

  // padding: 6px;
  .container {
    margin-left: 20px;
    // height: 80vh;
    overflow-y: auto;
  }
  .category {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid var(--color-body-invert-dim);
  }
}
</style>

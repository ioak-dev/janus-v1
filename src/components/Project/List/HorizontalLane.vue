<template>
  <div class="lane-horizontal" @dragover.prevent @drop.prevent="drop">
    <div class="category typography-5 space-bottom-2">{{ stage.name }}</div>
    <div class="container">
      <div
        v-for="task in tasks"
        v-bind:key="task.id"
        draggable="true"
        v-bind:id="task.id"
      >
        <ListItem v-bind:task="task" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ListItem from './ListItem.vue';

export default {
  name: 'HorizontalLane',
  components: {
    ListItem,
  },
  props: {
    stage: Object,
  },
  methods: {
    drop(e) {
      const id = e.dataTransfer.getData('id');
      const listItem = document.getElementById(id);
      listItem.style.display = 'block';
      // e.target.appendChild(listItem);
    },
  },
  computed: {
    ...mapGetters(['getTasksByStage']),
    tasks: function() {
      const taskList = this.getTasksByStage(this.stage._id);
      return taskList;
    },
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
    border-bottom: 1px solid var(--color-body-dim);
  }
}
</style>

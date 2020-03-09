<template>
  <div class="lane-vertical" @dragover.prevent @drop.prevent="drop">
    <div class="category typography-5 space-bottom-2">{{ category }}</div>
    <div class="container" v-bind:class="isDragging ? 'dragging' : ''">
      <div
        v-for="task in getTasks"
        v-bind:key="task.id"
        v-bind:id="task.id"
        draggable="true"
      >
        <Card v-bind:task="task" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Card from '../Board/Card';
import { receiveMessage } from '@/events/MessageService';

export default {
  name: 'VerticalLane',
  components: {
    Card,
  },
  props: {
    category: String,
  },
  data: function() {
    return {
      isDragging: false,
    };
  },
  methods: {
    ...mapActions(['fetchTasks']),
    drop(e) {
      const id = e.dataTransfer.getData('id');
      console.log(id);
      // const listItem = document.getElementById(id);
      // listItem.style.display = 'block';
      // e.target.appendChild(listItem);
    },
  },
  computed: mapGetters(['getTasks', 'getProfile']),
  created() {
    this.fetchTasks();
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'dragging') {
        this.isDragging = message.signal;
      }
    });
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
    height: 75vh;
    overflow-y: auto;
    &.dragging {
      overflow-y: hidden;
    }
  }
}
</style>

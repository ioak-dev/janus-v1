<template>
  <div class="lane-horizontal" @dragover.prevent @drop.prevent="drop">
    <div
      class="stage typography-5"
      v-bind:class="isExpanded ? 'show' : 'hide'"
      @click="toggle"
    >
      <i
        class="material-icons"
        v-bind:class="isExpanded ? 'showless' : 'showmore'"
        >expand_more</i
      >
      {{ stage.name }}
    </div>
    <div
      class="container"
      v-bind:class="isExpanded ? 'show' : 'hide'"
      ref="container"
    >
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
  data: function() {
    return {
      isExpanded: true,
    };
  },
  mounted() {
    this.updateScrollHeight();
  },
  methods: {
    drop(e) {
      const id = e.dataTransfer.getData('id');
      const listItem = document.getElementById(id);
      listItem.style.display = 'block';
      // e.target.appendChild(listItem);
    },
    toggle: function() {
      this.isExpanded = !this.isExpanded;
    },
    updateScrollHeight: function() {
      setTimeout(() => {
        if (this.isExpanded) {
          this.$refs.container.style.maxHeight =
            this.$refs.container.scrollHeight + 'px';
        } else {
          this.$refs.container.style.maxHeight = 0 + 'px';
        }
      }, 0);
    },
  },
  watch: {
    tasks: function() {
      this.updateScrollHeight();
    },
    isExpanded: function() {
      this.updateScrollHeight();
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
  user-select: none;
  .container {
    // margin-left: 20px;
    overflow-y: hidden;
    transition: max-height 250ms ease-in-out;
  }
  .stage {
    height: 60px;
    line-height: 60px;
    &.show {
      border-bottom: 1px solid var(--color-background-2);
    }
    color: var(--color-foreground-2);
    font-size: 0.9em;
    .material-icons {
      line-height: 60px;
      vertical-align: middle;
      cursor: pointer;
      transition: transform 250ms ease-in-out;
      &.showless {
        transform: scaleY(-1);
      }
    }
  }
}
</style>

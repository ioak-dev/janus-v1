<template>
  <div class="list-view" v-bind:class="styleClass">
    <div class="toolbar-container desktop-only" v-bind:class="styleClass">
      <Toolbar />
    </div>
    <div class="content-container">
      <div class="list-view-header" v-bind:class="styleClass">
        <div></div>
        <div>Task Id</div>
        <div>Title</div>
        <div>Assigned to</div>
        <div>Priority</div>
      </div>
      <div class="list-view-content" v-bind:class="styleClass">
        <div v-for="stage in getStagesByProjectId()" v-bind:key="stage._id">
          <horizontal-lane v-bind:stage="stage" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import HorizontalLane from './HorizontalLane.vue';
import Toolbar from './Toolbar.vue';
export default {
  name: 'ListView',
  components: {
    HorizontalLane,
    Toolbar,
  },
  computed: {
    ...mapGetters(['getStagesByProjectId', 'getProject']),
    styleClass: function() {
      if (this.getProject?.image) {
        return 'background-present';
      }
      return 'background-not-present';
    },
  },
};
</script>
<style lang="scss" scoped>
.list-view {
  &.background-present {
    background-size: cover !important;
  }
  .toolbar-container,
  .list-view-header,
  .list-view-content {
    background-color: var(--color-background-2);
    border-bottom: 1px solid var(--color-background-1);
  }
  .content-container {
    margin: 20px 40px;
  }
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  .list-view-header {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid var(--color-background-5);
    display: grid;
    grid-template-columns: 60px 1fr 3fr 1fr 1fr;
  }
  .list-view-content {
    // margin: 0 20px;
    overflow-x: auto;
    overflow-y: auto;
  }

  .list-view-header {
    display: grid;
    grid-template-columns: 60px repeat(4, minmax(25px, 1fr));
  }
}
</style>

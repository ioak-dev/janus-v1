<template>
  <div class="list-view app-content">
    <div class="toolbar-container desktop-only"><Toolbar /></div>
    <div class="list-view-header">
      <div>Task Id</div>
      <div>Title</div>
      <div>Assigned to</div>
      <div>Priority</div>
    </div>
    <div class="list-view-content">
      <div v-for="stage in getStagesByProjectId()" v-bind:key="stage._id">
        <horizontal-lane v-bind:stage="stage" />
      </div>
      <!-- <horizontal-lane category="In progress" />
      <horizontal-lane category="Complete" />
      <horizontal-lane category="Complete" />
      <horizontal-lane category="Complete" />
      <horizontal-lane category="Complete" />
      <horizontal-lane category="Complete" />
      <horizontal-lane category="Complete" />
      <horizontal-lane category="Selected for Development" />
      <horizontal-lane category="In progress" />
      <horizontal-lane category="Complete" /> -->
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
    ...mapGetters(['getStagesByProjectId']),
  },
};
</script>
<style lang="scss" scoped>
.list-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  .list-view-header {
    margin: 0px 10px;
    min-height: 36px;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid var(--color-background-2);
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 1fr;
  }
  .list-view-content {
    margin: 0px 10px;
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>

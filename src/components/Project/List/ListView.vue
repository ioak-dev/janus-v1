<template>
  <div class="list-view">
    <div class="content-container">
      <div class="list-view-header">
        <!-- <div></div> -->
        <div>Task Id</div>
        <div>Type</div>
        <div>Title</div>
        <div>Assigned to</div>
        <div>Priority</div>
      </div>
      <div class="list-view-content">
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
export default {
  name: 'ListView',
  components: {
    HorizontalLane,
  },
  computed: {
    ...mapGetters(['getStagesByProjectId', 'getProject']),
  },
};
</script>
<style lang="scss" scoped>
.list-view {
  .toolbar-container,
  .list-view-header,
  .list-view-content {
    background-color: var(--color-background-3);
  }
  display: flex;
  flex-direction: column;
  // height: calc(100vh - 60px - 50px);
  .list-view-header {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid var(--color-background-2);
    display: grid;
    grid-template-columns: 60px 1fr 3fr 1fr 1fr;
  }
  .list-view-content {
    padding: 0 20px;
    overflow-y: auto;
  }

  .list-view-header {
    padding: 0 30px;
    display: grid;
    column-gap: 20px;
    grid-template-columns: repeat(5, minmax(25px, 1fr));
  }

  .content-container {
    overflow-y: auto;
    border-radius: 6px;
    margin: 20px 20px;
    box-shadow: var(--bs-lg);
  }
}
</style>

<template>
  <div class="epic-view">
    <div class="epic-list">
      <EpicCard
        v-for="item in getEpicTasks"
        v-bind:key="item._id"
        v-bind:task="item"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import EpicCard from './EpicCard.vue';
export default {
  name: 'EpicView',
  components: { EpicCard },
  computed: { ...mapGetters(['getEpicTasks']) },
};
</script>
<style lang="scss" scoped>
.epic-view {
  width: 100%;
  padding: 20px;
  .epic-list {
    display: grid;
    row-gap: 20px;
    column-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
}
</style>

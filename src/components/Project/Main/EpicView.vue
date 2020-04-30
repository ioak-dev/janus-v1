<template>
  <div class="epic-view">
    <div class="epic-list">
      <OakAccordion
        v-for="item in getEpicTasks"
        v-bind:key="item._id"
        v-bind:label="`${item.taskId} - ${item.title}`"
        group="epic-view"
        collapseOthers
      >
        <div slot="content">
          <EpicCard v-bind:task="item" />
        </div>
      </OakAccordion>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import EpicCard from './EpicCard.vue';
import OakAccordion from '@/oakui/OakAccordion.vue';
export default {
  name: 'EpicView',
  components: { EpicCard, OakAccordion },
  computed: { ...mapGetters(['getEpicTasks']) },
};
</script>
<style lang="scss" scoped>
.epic-view {
  padding: 20px;
  .epic-list {
    display: grid;
    row-gap: 20px;
    column-gap: 20px;
    grid-template-columns: 1fr;
  }
}
</style>

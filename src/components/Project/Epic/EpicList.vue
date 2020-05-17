<template>
  <div class="epic-list">
    <div v-for="epic in getEpicTasks" v-bind:key="epic._id">
      <EpicPreview v-bind:epic="epic" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import EpicPreview from './EpicPreview.vue';
export default {
  name: 'EpicList',
  props: { epicId: String },
  components: { EpicPreview },
  computed: {
    ...mapGetters(['getEpicTasks']),
  },
};
</script>
<style lang="scss" scoped>
.epic-list {
  padding: 10px 40px;
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;
}
</style>

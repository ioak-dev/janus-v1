<template>
  <div class="epic-list"></div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'EpicView',
  props: { epicId: String },
  computed: {
    ...mapGetters(['getEpicTasks']),
  },
};
</script>
<style lang="scss" scoped></style>

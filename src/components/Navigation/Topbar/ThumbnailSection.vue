<template>
  <div>
    <div v-if="getProject">
      <Thumbnail v-bind:url="getProject.image" />
    </div>
    <div v-if="getTeam">
      <Thumbnail v-bind:url="getTeam.image" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Thumbnail from '@/components/Avatar/Thumbnail.vue';
export default {
  name: 'ThumbnailSection',
  components: { Thumbnail },
  computed: {
    ...mapGetters(['getProject', 'getTeam']),
  },
};
</script>
<style lang="scss" scoped></style>

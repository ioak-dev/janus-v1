<template>
  <div class="team-change-background">
    <ImageSearch @click="chooseImage" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ImageSearch from '@/components/ImageLib/ImageSearch.vue';
export default {
  name: 'TeamChangeBackground',
  components: {
    ImageSearch,
  },
  computed: {
    ...mapGetters(['getTeam']),
  },
  methods: {
    ...mapActions(['saveTeam']),
    chooseImage: function(url) {
      this.saveTeam({ ...this.getTeam, image: url });
    },
  },
};
</script>
<style lang="scss" scoped>
.team-change-background {
  padding: 10px 100px;
}
</style>

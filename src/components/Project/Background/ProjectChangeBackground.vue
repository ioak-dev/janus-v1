<template>
  <div class="project-change-background">
    <ImageSearch @click="chooseImage" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ImageSearch from '@/components/ImageLib/ImageSearch.vue';
export default {
  name: 'ProjectChangeBackground',
  components: {
    ImageSearch,
  },
  computed: {
    ...mapGetters(['getProject']),
  },
  methods: {
    ...mapActions(['saveProject']),
    chooseImage: function(url) {
      this.saveProject({ ...this.getProject, image: url });
    },
  },
};
</script>
<style lang="scss" scoped>
.project-change-background {
  padding: 10px 100px;
}
</style>

<template>
  <div class="getting-started-individual">
    <div class="typography-10">I am an individual</div>
    <div class="typography-5">
      If you are an individual and would like to use Janus for yourself, you can
      proceed with the common Janus space to create your project
    </div>
    <OakButton
      theme="primary"
      label="Individual user (coming soon)"
      variant="appear"
      @click="setupSpace"
    />
  </div>
</template>
<script>
import OakButton from '../../oakui/OakButton.vue';
export default {
  name: 'Individual',
  components: { OakButton },
  methods: {
    setupSpace() {
      console.log('redirect to individual space');
    },
  },
};
</script>
<style lang="scss" scoped>
.getting-started-individual {
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;
  justify-items: center;
}
</style>

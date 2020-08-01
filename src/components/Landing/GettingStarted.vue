<template>
  <div class="getting-started">
    <Individual />
    <div class="getting-started--divider">
      <span>-------</span>
      <span>or</span>
      <span>-------</span>
    </div>
    <Onboard />
  </div>
</template>
<script>
import Onboard from './Onboard.vue';
import Individual from './Individual.vue';
export default {
  name: 'GettingStarted',
  components: { Onboard, Individual },
};
</script>
<style lang="scss" scoped>
.getting-started {
  display: grid;
  grid-auto-flow: row;
  row-gap: 20px;
  justify-items: center;
  text-align: center;

  .getting-started--divider {
  }
}
</style>

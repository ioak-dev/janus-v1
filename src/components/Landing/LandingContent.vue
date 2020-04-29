<template>
  <div class="landing-content">
    <SectionOne />
    <SectionTwo />
    <SectionThree />
    <SectionFour />
  </div>
</template>
<script>
import SectionOne from './SectionOne.vue';
import SectionTwo from './SectionTwo.vue';
import SectionThree from './SectionThree.vue';
import SectionFour from './SectionFour.vue';
export default {
  name: 'LandingContent',
  components: { SectionOne, SectionTwo, SectionThree, SectionFour },
};
</script>
<style lang="scss" scoped>
.landing-content {
  user-select: none;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-background-2);
}
</style>

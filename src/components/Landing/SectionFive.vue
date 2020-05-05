<template>
  <div class="section-five">
    <div class="left" />
    <div class="right">
      <div class="typography-12">Demo space and project</div>
      <div class="typography-6">Go around and take a look</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SectionFive',
};
</script>
<style lang="scss" scoped>
.section-five {
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr;
  }
  .left {
    @media (max-width: 767px) {
      display: none;
    }
    background: url('../../assets/landing/demo.jpg') no-repeat center center;
    background-size: cover;
  }
  .right {
    background-color: var(--color-primary-1);
  }
}
</style>

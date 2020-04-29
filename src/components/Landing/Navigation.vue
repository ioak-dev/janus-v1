<template>
  <div class="navigation">
    <div class="left">
      <Logo />
    </div>
    <div class="right">right</div>
  </div>
</template>
<script>
import Logo from '@/components/Logo/Logo.vue';
export default {
  name: 'Navigation',
  components: { Logo },
};
</script>
<style lang="scss" scoped>
.navigation {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 10px 20px;
}
</style>

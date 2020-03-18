<template>
  <div class="header">
    <i
      class="material-icons"
      data-test="toggle-sidebar"
      @click="$emit('sidebarToggled')"
    >
      menu_open
    </i>
    <Logo />
  </div>
</template>
<script>
import Logo from '@/components/Logo/Logo.vue';
export default {
  name: 'Header',
  components: {
    Logo,
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  line-height: 60px;
  margin: 0px 10px;
  .material-icons {
    cursor: pointer;
    line-height: 60px;
  }
}
</style>

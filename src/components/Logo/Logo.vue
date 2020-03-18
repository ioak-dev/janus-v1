<template>
  <img class="logo" v-bind:src="janusLogo" alt="Janus logo" />
</template>
<script>
export default {
  name: 'Logo',
  data: function() {
    return {
      janusLogo: require('@/assets/janus_logo.svg'),
    };
  },
};
</script>
<style lang="scss" scoped>
img {
  &.logo {
    height: 35px;
    width: auto;
  }
}
</style>

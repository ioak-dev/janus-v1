<template>
  <div class="header">
    <i
      class="material-icons"
      v-if="isSidebarExpanded"
      v-on:click="$emit('sidebarToggled')"
    >
      menu_open
    </i>
    <img class="logo" v-bind:src="janusLogo" alt="Janus logo" />
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    isSidebarExpanded: Boolean,
  },
  data: function() {
    return {
      janusLogo: require('@/assets/janus_logo.svg'),
    };
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
  img {
    &.logo {
      height: 35px;
      width: auto;
    }
  }
}
</style>

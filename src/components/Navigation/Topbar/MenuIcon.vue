<template>
  <div class="menu-icon">
    <i
      data-test="toggle-sidebar"
      class="material-icons"
      v-if="!getProfile.sidebar"
      @click="$emit('click')"
    >
      menu
    </i>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'MenuIcon',
  computed: {
    ...mapGetters(['getProfile']),
  },
};
</script>
<style lang="scss" scoped>
.menu-icon {
  margin-left: 10px;
  .material-icons {
    cursor: pointer;
    line-height: 50px;
    font-size: 2em;
  }
}
</style>

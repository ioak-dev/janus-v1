<template>
  <div class="topbar">
    <div class="left">
      <menu-icon @click="$emit('sidebarToggled')" />
      <div class="left-nav-container">
        <div class="title-row-container"><title-row /></div>
        <context-nav />
      </div>
    </div>
    <div class="right">
      <div>
        <UserAccount />
      </div>
    </div>
  </div>
</template>
<script>
import UserAccount from './RightNav/UserAccount.vue';
import TitleRow from './TitleRow.vue';
import ContextNav from './ContextNav/ContextNav.vue';
import MenuIcon from './MenuIcon.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Topbar',
  components: {
    UserAccount,
    TitleRow,
    MenuIcon,
    ContextNav,
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  methods: {
    ...mapActions(['removeAuth']),
    logout() {
      this.removeAuth(this.$cookies);
    },
  },
};
</script>
<style scoped lang="scss">
.topbar {
  background-color: var(--color-body);
  display: flex;
  height: 100%;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left-nav-container {
      margin-left: 20px;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    justify-items: flex-end;
    margin-right: 10px;
  }
}
</style>

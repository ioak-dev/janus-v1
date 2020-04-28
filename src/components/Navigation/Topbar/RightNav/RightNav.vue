<template>
  <div class="right-nav">
    <CreateNew v-if="userEmail" class="nav-item" />
    <UserAccount class="nav-item" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import UserAccount from './UserAccount.vue';
import CreateNew from './CreateNew.vue';
export default {
  name: 'RightNav',
  components: {
    UserAccount,
    CreateNew,
  },
  computed: {
    ...mapGetters(['getProfile']),
    userEmail: function() {
      return this?.getProfile?.auth?.email;
    },
  },
};
</script>
<style lang="scss" scoped>
.right-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  .nav-item {
    margin-right: 10px;
  }
}
</style>

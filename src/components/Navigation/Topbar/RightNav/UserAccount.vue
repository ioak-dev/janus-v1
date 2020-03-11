<template>
  <div class="user-account">
    <!-- <OakPopoverMenu
      id="user-account-popover-menu"
      v-bind:label="getProfile.auth.email"
      v-bind:elements="elements"
      right
      iconLeft="person"
    /> -->
    <OakPopoverMenu
      id="user-account-popover-menu"
      v-bind:elements="elements"
      right
      iconLeft="person"
    >
      <div slot="label">
        <Avatar v-bind:initials="initials" />
      </div>
    </OakPopoverMenu>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';
import Avatar from '@/components/Avatar/Avatar.vue';
export default {
  name: 'UserAccount',
  components: {
    OakPopoverMenu,
    Avatar,
  },
  computed: {
    ...mapGetters(['getProfile']),
    initials: function() {
      return this?.getProfile?.auth?.email?.substring(0, 2);
    },
    elements: function() {
      const elementsList = [];
      if (this.getProfile?.auth?.isAuth) {
        elementsList.push({
          icon: 'power_settings_new',
          label: 'Sign out',
          action: this.logout,
        });
        elementsList.push({
          icon: 'settings',
          label: 'Profile Settings',
          action: this.logout,
        });
      } else {
        elementsList.push({
          icon: 'fingerprint',
          label: 'Sign in',
          action: () => this.$router.push(`/${this.getProfile?.space}/login`),
        });
      }
      return elementsList;
    },
  },
  methods: {
    ...mapActions(['removeAuth']),
    logout() {
      this.removeAuth(this.$cookies);
    },
  },
};
</script>
<style lang="scss" scoped>
.user-account {
  display: flex;
  align-items: center;
}
</style>

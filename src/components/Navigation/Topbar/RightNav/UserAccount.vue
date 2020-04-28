<template>
  <div class="user-account">
    <OakPopoverMenu
      v-if="user"
      id="user-account-popover-menu"
      v-bind:elements="elements"
      right
      iconLeft="person"
    >
      <div slot="label">
        <Avatar v-bind:user="user" />
      </div>
    </OakPopoverMenu>
    <div v-if="!user && this.getProfile && this.getProfile.space">
      <OakButton
        label="Sign in"
        align="left"
        theme="primary"
        variant="animate in"
        @click="oaSignin('signin')"
      />
      <OakButton
        label="Sign up"
        align="right"
        theme="primary"
        variant="animate in"
        @click="oaSignin('signup')"
      />
    </div>

    <OakModal
      v-bind:visible="profileDialogOpen"
      @close="toggleProfileDialog"
      label="Edit profile"
    >
      <div slot="modal-body">
        <div class="edit-profile">
          <div>
            <div class="typography-6 heading">Choose Avatar</div>
            <div class="avatar-section">
              <div
                v-for="n in 20"
                v-bind:key="n"
                class="avatar-item"
                @click="handleAvatarChange(n)"
                v-bind:class="n === data.avatar ? 'selected' : ''"
              >
                <AvatarImage v-bind:reference="n" size="large" />
              </div>
            </div>
          </div>
          <div>
            <div class="typography-6 heading">Other settings</div>
            <div class="typography-2">Name, email, password</div>
            <div class="typography-4">
              You can change these settings from oneauth
            </div>
          </div>
        </div>
      </div>
      <div slot="modal-footer">
        <OakButton
          label="Save"
          theme="primary"
          variant="animate in"
          @click="saveProfile"
        />
      </div>
    </OakModal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakPopoverMenu from '@/oakui/OakPopoverMenu.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakModal from '@/oakui/OakModal.vue';
import Avatar from '@/components/Avatar/Avatar.vue';
import AvatarImage from '@/components/Avatar/AvatarImage.vue';
export default {
  name: 'UserAccount',
  components: {
    OakPopoverMenu,
    OakButton,
    OakModal,
    Avatar,
    AvatarImage,
  },
  data: function() {
    return {
      profileDialogOpen: false,
      data: {
        avatar: '',
      },
    };
  },
  mounted() {
    this.data.avatar = this.user?.avatar;
  },
  computed: {
    ...mapGetters(['getProfile', 'getUserByEmail']),
    user: function() {
      return this?.getUserByEmail(this?.getProfile?.auth?.email);
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
          action: this.toggleProfileDialog,
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
  watch: {
    user: function() {
      console.log(this.user);
      this.data.avatar = this.user?.avatar;
    },
  },
  methods: {
    ...mapActions(['removeAuth', 'saveUser']),
    logout() {
      this.removeAuth(this.$cookies);
    },
    oaSignin(type) {
      window.location.href = `http://localhost:3010/#/${this.getProfile?.space}/login?type=${type}&appId=${process.env.VUE_APP_ONEAUTH_APP_ID}`;
    },
    toggleProfileDialog() {
      this.profileDialogOpen = !this.profileDialogOpen;
    },
    handleAvatarChange(n) {
      this.data.avatar = n;
    },
    saveProfile() {
      this.saveUser({ ...this.user, avatar: this.data.avatar });
    },
  },
};
</script>
<style lang="scss" scoped>
.user-account {
  display: flex;
  align-items: center;

  .edit-profile {
    display: grid;
    grid-auto-flow: row;
    row-gap: 40px;
    .heading {
      border-right: 4px solid var(--color-primary-1);
      padding-right: 4px;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
    }
    .avatar-section {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .avatar-item {
        margin: 20px;
        padding: 10px;
        border-radius: 6px;
        cursor: pointer;
        border: 1px solid transparent;
        &:hover {
          border: 1px solid var(--color-background-5);
          // border: 1px solid red;
          // background-color: var(--color-background-5);
        }
        &.selected {
          border: 1px solid var(--color-primary-1);
          // background-color: var(--color-background-1);
        }
      }
    }
  }
}
</style>

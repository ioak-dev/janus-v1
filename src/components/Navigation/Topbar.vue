<template>
  <div class="topbar">
    <div class="left">
      <div class="expand-collapse">
        <i
          class="material-icons"
          v-if="!getProfile.sidebar"
          @click="$emit('sidebarToggled')"
        >
          menu
        </i>
      </div>
    </div>
    <div class="right">
      <div>
        <OakButton
          v-if="getProfile.auth.isAuth"
          @click="logout"
          label="Logout"
          theme="primary"
          variant="animate none"
        />
      </div>
    </div>
  </div>
</template>
<script>
import OakButton from '@/oakui/OakButton.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Topbar',
  components: {
    OakButton,
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
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  .left {
    .expand-collapse {
      margin-left: 10px;
      .material-icons {
        cursor: pointer;
        line-height: 50px;
        font-size: 2em;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    justify-items: flex-end;
  }
}
</style>

<template>
  <div class="theme">
    <div
      class="action-icon"
      v-if="getProfile.theme === 'theme_dark'"
      @click="setTheme('theme_light')"
    >
      <OakIcon mat="brightness_low" color="white" />
    </div>
    <div class="action-icon" v-else @click="setTheme('theme_dark')">
      <OakIcon mat="nights_stay" color="white" />
    </div>
  </div>
</template>
<script>
import OakIcon from '@/oakui/OakIcon.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'ThemeNav',
  components: { OakIcon },
  computed: { ...mapGetters(['getProfile']) },
  methods: {
    ...mapActions(['setTheme']),
  },
};
</script>
<style lang="scss" scoped>
.theme {
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  line-height: 60px;
  margin: 0px 10px;
  .action-icon {
    cursor: pointer;
  }
}
</style>

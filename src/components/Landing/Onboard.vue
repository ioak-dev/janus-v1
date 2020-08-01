<template>
  <div class="getting-started-onboard">
    <div class="typography-10">I am a company</div>
    <div class="typography-5">
      If you are new and wanted to setup Janus for your organization, create a
      space in Oneauth to get started. You can create a space for your company,
      once you sign in to Oneauth administration console.
    </div>
    <OakButton
      theme="primary"
      label="Create company space"
      variant="appear"
      @click="setupSpace"
    />
  </div>
</template>
<script>
import OakButton from '../../oakui/OakButton.vue';
export default {
  name: 'Onboard',
  components: { OakButton },
  methods: {
    setupSpace() {
      window.location.href = `${process.env.VUE_APP_ONEAUTH_URL}/#/login?type=signup`;
    },
  },
};
</script>
<style lang="scss" scoped>
.getting-started-onboard {
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;
  justify-items: center;
}
</style>

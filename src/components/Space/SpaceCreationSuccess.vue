<template>
  <div>
    <div className="typography-4 space-bottom-4">
      Space {{ name }} has been setup and is available now
    </div>
    <OakButton
      theme="primary"
      variant="disappear"
      @click="gotoTenantPage"
      label="Visit my space"
    />
  </div>
</template>
<script>
import OakButton from '@/oakui/OakButton.vue';
export default {
  name: 'SpaceCreationSuccess',
  props: {
    name: String,
  },
  components: {
    OakButton,
  },
  methods: {
    gotoTenantPage() {
      this.$router.push(`/${this.name}/board`);
    },
  },
};
</script>

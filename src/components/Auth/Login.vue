<template>
  <div />
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Login',
  computed: {
    ...mapGetters(['getProfile']),
  },
  methods: {
    ...mapActions(['setSpace']),
  },
  created() {
    if (this.$route.query.space && this.$route.query.authKey) {
      this.setSpace(this.$route.query.space);
      this.$cookies.set(
        `janus_${this.$route.query.space}`,
        this.$route.query.authKey
      );
      this.$router.push({
        name: 'SpaceHomeDefault',
        params: { space: this.$route.query.space },
      });
    }
  },
};
</script>
<style scoped lang="scss">
@import './Login.scss';
</style>

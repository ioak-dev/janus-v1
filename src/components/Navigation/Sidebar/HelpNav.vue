<template>
  <div class="help-nav" @click="redirectToMirror">Need help?</div>
</template>
<script>
import { mapGetters } from 'vuex';
import jwt from 'jsonwebtoken';
export default {
  name: 'HelpNav',
  computed: {
    ...mapGetters(['getProfile']),
  },
  methods: {
    redirectToMirror: function() {
      const token = jwt.sign(
        {
          userId: this.getProfile.auth._id,
          firstName: this.getProfile.auth.firstName,
          lastName: this.getProfile.auth.lastName,
          email: this.getProfile.auth.email,
        },
        'jwtsecret',
        { expiresIn: '8h' }
      );
      window.open(`${process.env.VUE_APP_MIRROR_URL}?token=${token}`, '_blank');
      // .focus();
      //   window.location.href = `${process.env.VUE_APP_MIRROR_URL}?token=${token}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.help-nav {
  padding: 0 10px 0 15px;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  &:hover {
    background-color: var(--color-nav-hover);
  }
}
</style>

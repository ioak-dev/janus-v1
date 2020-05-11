<template>
  <div class="section-four">
    <div class="heading typography-12 space-bottom-2">
      Frequently asked questions
    </div>
    <div class="content">
      <ol>
        <li class="title space-bottom-2">
          What is oneauth?
          <div class="subtitle space-top-1">
            Oneauth is the single sign on authentication provider that is used
            to authenticate your sign in information
          </div>
        </li>
        <li class="title space-bottom-2">
          How does a space work?
          <div class="subtitle space-top-1">
            You create a space in oneauth. Users (your employees) should signup
            to this space from oneauth and they will be able to view the
            projects for which the user is permitted access in Janus
          </div>
        </li>
        <li class="title space-bottom-2">
          Is my data secure and restricted within my organization space?
          <div class="subtitle space-top-1">
            We do data compartmentalization based on multi-tenancy architecture
            to ensure, each space gets it's own database for data storage. This
            way, your data is completely secure and never goes out of your space
          </div>
        </li>
        <li class="title space-bottom-2">
          How can I onboard an employee into my organization space?
          <div class="subtitle space-top-1">
            Employee should signup for a user account in oneauth. Once an
            employee signs up on oneauth, he/she can login to your space in
            Janus. Then you should provide access to the individual projects and
            teams
          </div>
        </li>
        <li class="title space-bottom-2">
          Is Janus really free?
          <div class="subtitle space-top-1">
            Yes. Janus is completely free to use for all purposes including
            commercial Users. We are constantly improving the application
            usability and project management efficiency. Feel free to share your
            feedback and feature requests to improve the application further
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SectionSix',
  methods: {
    signup: function() {
      window.location.href = `${process.env.VUE_APP_ONEAUTH_URL}/#/space/oa213/login?type=signup&appId=${process.env.VUE_APP_ONEAUTH_APP_ID}`;
    },
    takemetospace: function() {
      this.$router.push('/oa213/home');
    },
  },
};
</script>
<style lang="scss" scoped>
.section-four {
  margin: 40px 10px;

  .heading {
    display: flex;
    justify-content: center;
  }

  .content {
    width: 80vw;
    margin: auto;

    ol li {
      &.title {
        font-size: var(--metric-typography-8);
      }
      .subtitle {
        font-size: var(--metric-typography-6);
      }
    }
  }

  .inline {
    display: inline;
  }

  .link {
    text-decoration: underline;
    color: var(--color-primary-1);
    cursor: pointer;
    &:hover {
      color: var(--color-primary-2);
    }
  }
}
</style>

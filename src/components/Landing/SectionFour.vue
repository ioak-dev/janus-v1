<template>
  <div class="section-four">
    <div class="heading typography-12 space-bottom-2">
      Onboard your projects without a space
    </div>
    <div class="content">
      <ol>
        <li class="title space-bottom-2">
          Create your user account
          <div class="subtitle space-top-1">
            Create your user account on
            <div class="link inline" @click="signup">oneauth</div>
            and sign in to Janus workspace
          </div>
        </li>
        <li class="title space-bottom-2">
          Create projects
          <div class="subtitle space-top-1">
            You can start creating a kanban or scrum project once you login to
            the open
            <div class="link inline" @click="takemetospace">space</div>
          </div>
        </li>
        <li class="title space-bottom-2">
          Create teams
          <div class="subtitle space-top-1">
            Teams are the logical entity to group employees of your organization
            into various project teams for easy access management
          </div>
        </li>
        <li class="title space-bottom-2">
          Start planning
          <div class="subtitle space-top-1">
            Once one or more teams are assigned to a project, you can start
            managing your projects
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SectionFour',
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

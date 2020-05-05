<template>
  <div class="section-two">
    <div class="heading typography-12 space-bottom-2">
      Onboard your organization
    </div>
    <div class="content">
      <ol>
        <li class="title space-bottom-2">
          Setup company space
          <div class="subtitle space-top-1">
            Space is the dedicated entity representing your organization. It has
            it's own data isolation, accessible only to the memebers of your
            organization
            <div class="link" @click="createSpace">Create space</div>
          </div>
        </li>
        <li class="title space-bottom-2">
          Sign in to your organization space
          <div class="subtitle space-top-1">
            Once your space is setup on oneauth, you can find your login page to
            Janus from oneauth dashboard
          </div>
        </li>
        <li class="title space-bottom-2">
          Create projects
          <div class="subtitle space-top-1">
            You can start creating a kanban or scrum project once you login to
            your space on Janus
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
import OakButton from '@/oakui/OakButton.vue';
export default {
  name: 'SectionTwo',
  methods: {
    createSpace: function() {
      window.location.href = `${process.env.VUE_APP_ONEAUTH_URL}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.section-two {
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

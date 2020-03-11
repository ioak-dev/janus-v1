<template>
  <div class="navigation">
    <div class="headline">Projects</div>
    <div
      v-for="project in getProjects"
      v-bind:key="project._id"
      class="project-container"
    >
      <router-link
        v-bind:to="`/${getProfile.space}/${project._id}/board`"
        v-bind:class="
          $route.path.startsWith(`/${getProfile.space}/${project._id}`)
            ? 'project-route-active'
            : ''
        "
      >
        {{ project.name }}
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ProjectNav',
  computed: {
    ...mapGetters(['getProfile', 'getProjects']),
  },
};
</script>
<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-body-dim);
  border-bottom: 1px solid var(--color-body-dim);
  padding: 10px 0px;
  a {
    text-decoration: none;
    color: white;
    padding: 0 10px 0 15px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    &:hover {
      background-color: var(--color-body-dim);
    }
    &.project-route-active {
      background-color: var(--color-primary);
    }
  }
  .headline {
    padding: 5px 15px;
    height: 28px;
    line-height: 28px;
    color: var(--color-body-invert-dim);
  }
}
</style>

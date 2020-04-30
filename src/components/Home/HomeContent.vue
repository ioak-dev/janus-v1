<template>
  <div class="home-content">
    <div class="container">
      <div class="typography-10">Your Projects</div>
      <section class="projects">
        <div v-for="project in getProjects" v-bind:key="project._id">
          <Project v-bind:project="project" />
        </div>
      </section>
    </div>
    <div class="container">
      <div class="typography-10">Your Teams</div>
      <section class="teams">
        <div v-for="team in getTeams" v-bind:key="team._id">
          <Team v-bind:team="team" />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Project from './Project.vue';
import Team from './Team.vue';
export default {
  name: 'HomeContent',
  components: { Project, Team },
  computed: { ...mapGetters(['getProjects', 'getTeams']) },
};
</script>
<style lang="scss" scoped>
.home-content {
  width: 80%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: auto;
  display: grid;
  grid-auto-flow: row;
  row-gap: 60px;
  .container {
    background-color: var(--color-background-3);
    border-radius: 4px;
    box-shadow: var(--bs-lg);
    border-left: 4px solid var(--color-secondary-1);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    justify-items: baseline;
    padding: 20px;
    .projects,
    .teams {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 20px;
      column-gap: 20px;
    }
  }
}
</style>

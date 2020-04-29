<template>
  <div class="team-projects" v-bind:class="styleClass">
    <div class="container" v-if="getTeam">
      {{ getTeam }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TeamProjects',
  computed: {
    ...mapGetters(['getTeam']),
    styleClass: function() {
      if (this.getTeam?.image) {
        return 'background-present';
      }
      return 'background-not-present';
    },
  },
  watch: {
    getTeam: function() {
      if (this.getTeam?.image) {
        document.getElementsByClassName(
          'team-projects'
        )[0].style.background = `url(${this.getTeam.image}) no-repeat center center`;
      }
    },
  },
  mounted() {
    if (this.getTeam?.image) {
      document.getElementsByClassName(
        'team-projects'
      )[0].style.background = `url(${this.getTeam.image}) no-repeat center center`;
    }
  },
};
</script>
<style lang="scss" scoped>
.team-projects {
  &.background-present {
    background-size: cover !important;
  }
  .toolbar-container {
    &.background-not-present {
      background-color: var(--color-background-2);
      border-bottom: 1px solid var(--color-background-1);
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }
    &.background-present {
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
      background-color: var(--color-background-transparent-1);
    }
  }
  height: calc(100vh - 60px);
  overflow: auto;
  .container {
    margin: 20px 20px;
    padding: 20px;
    border-radius: 4px;
    display: grid;
    grid-template-rows: auto auto auto;
    align-items: flex-start;
    row-gap: 30px;
    background-color: var(--color-background-2);
  }
}
</style>

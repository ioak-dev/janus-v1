<template>
  <div class="team" v-bind:class="styleClass">
    <!-- <div class="toolbar-container desktop-only" v-bind:class="styleClass">
      <Toolbar />
    </div> -->
    <div class="team-content">
      <div class="search-bar">
        <OakAutoComplete
          placeholder="Search for team name"
          @change="handleChange"
          v-bind:objects="teamList"
          id="people-search"
        />
      </div>
      <div class="team-list" v-if="getProject">
        <div
          v-for="item in getProject.teamIdList"
          :key="item"
          class="team-record"
          group="team-list"
          :label="item"
          collapseOthers
        >
          <TeamPreview v-bind:id="item" @remove="removeTeam(item)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakAutoComplete from '@/oakui/OakAutoComplete.vue';
import TeamPreview from './TeamPreview.vue';

export default {
  name: 'TeamView',
  components: { OakAutoComplete, TeamPreview },
  computed: {
    ...mapGetters(['getProject', 'getTeams', 'findTeamById']),
    styleClass: function() {
      if (this.getProject?.image) {
        return 'background-present';
      }
      return 'background-not-present';
    },
    teamList: function() {
      const teams = [];
      this.getTeams?.forEach(item => {
        teams.push({
          key: item._id,
          value: `${item.name}`,
        });
      });
      return teams;
    },
  },
  methods: {
    ...mapActions(['saveProject']),
    handleChange: function(key) {
      const teamIdList = this.getProject.teamIdList
        ? this.getProject?.teamIdList
        : [];
      teamIdList.push(key);
      this.saveProject({
        ...this.getProject,
        teamIdList: [...new Set(teamIdList)],
      });
    },
    removeTeam: function(key) {
      const teamIdList = this.getProject.teamIdList.filter(
        item => item !== key
      );
      this.saveProject({
        ...this.getProject,
        teamIdList: [...new Set(teamIdList)],
      });
    },
  },
  //   watch: {
  //     getProject: function() {
  //       if (this.getProject?.image) {
  //         document.getElementsByClassName(
  //           'team'
  //         )[0].style.background = `url(${this.getProject.image}) no-repeat center center`;
  //       }
  //     },
  //   },
  //   mounted() {
  //     if (this.getProject?.image) {
  //       document.getElementsByClassName(
  //         'team'
  //       )[0].style.background = `url(${this.getProject.image}) no-repeat center center`;
  //     }
  //   },
};
</script>
<style lang="scss" scoped>
.team {
  padding: 10px 100px;
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
  .team-content {
    touch-action: none;
    display: grid;
    grid-template-columns: auto;
    align-content: flex-start;
    row-gap: 10px;
    overflow: auto;
    height: calc(100vh - 60px);
    .team-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;
      row-gap: 20px;
    }
  }
}
</style>

<template>
  <div class="team" v-bind:class="styleClass">
    <!-- <div class="toolbar-container desktop-only" v-bind:class="styleClass">
      <Toolbar />
    </div> -->
    <div class="container">
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
            v-for="item in getProjectTeamsByProjectId(getProject._id)"
            :key="item._id"
            class="team-record"
            group="team-list"
            :label="item"
            collapseOthers
          >
            <TeamPreview
              v-bind:projectTeam="item"
              @remove="removeTeam(item._id)"
            />
          </div>
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
    ...mapGetters([
      'getProject',
      'getTeams',
      'findTeamById',
      'getProjectTeamsByProjectId',
    ]),
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
    ...mapActions(['saveProject', 'saveProjectTeam', 'deleteProjectTeam']),
    handleChange: function(key) {
      this.saveProjectTeam({ projectId: this.getProject._id, teamId: key });
    },
    removeTeam: function(id) {
      this.deleteProjectTeam(id);
    },
  },
};
</script>
<style lang="scss" scoped>
.team {
  .container {
    height: calc(100vh - 60px);
    overflow: auto;
    padding: 10px 100px;
    .team-content {
      touch-action: none;
      display: grid;
      grid-template-columns: auto;
      align-content: flex-start;
      row-gap: 10px;
      margin-top: 20px;
      overflow: auto;
      // height: calc(100vh - 60px);
      .team-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 20px;
        row-gap: 20px;
      }
    }
  }
}
</style>

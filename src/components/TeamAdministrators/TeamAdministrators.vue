<template>
  <div class="team-administrator" v-bind:class="styleClass">
    <div class="container" v-if="getTeam">
      <div>
        <OakAutoComplete
          @change="addMember"
          v-bind:objects="peopleList"
          label="Search to add members"
          id="people-search"
        />
      </div>
      <div class="members">
        <div
          v-for="(item, index) in getRolesByTeamId(getTeam._id)"
          :key="index"
        >
          <Member v-bind:role="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import OakAutoComplete from '@/oakui/OakAutoComplete.vue';
import Member from './Member.vue';
export default {
  name: 'TeamAdministrators',
  components: { OakAutoComplete, Member },
  computed: {
    ...mapGetters(['getTeam', 'getUsers', 'getUserById', 'getRolesByTeamId']),
    styleClass: function() {
      if (this.getTeam?.image) {
        return 'background-present';
      }
      return 'background-not-present';
    },
    peopleList: function() {
      const people = [];
      this.getUsers?.forEach(item => {
        people.push({
          key: item._id,
          value: `${item.firstName} ${item.lastName}`,
        });
      });
      return people;
    },
  },
  methods: {
    ...mapActions(['saveTeam', 'deleteTeam', 'saveRole']),
    addMember: function(key) {
      this.saveRole({
        type: 'TeamAdministrator',
        domainId: this.getTeam._id,
        userId: key,
      });
    },
  },
  watch: {
    getTeam: function() {
      if (this.getTeam?.image) {
        document.getElementsByClassName(
          'team-administrator'
        )[0].style.background = `url(${this.getTeam.image}) no-repeat center center`;
      }
    },
  },
  mounted() {
    if (this.getTeam?.image) {
      document.getElementsByClassName(
        'team-administrator'
      )[0].style.background = `url(${this.getTeam.image}) no-repeat center center`;
    }
  },
};
</script>
<style lang="scss" scoped>
.team-administrator {
  background-color: var(--color-background-1);
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
    .action {
      display: grid;
      grid-auto-flow: column;
      justify-content: flex-end;
      column-gap: 20px;
    }
  }
}
</style>

<template>
  <div class="project-administrator">
    <div class="container" v-if="getProject">
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
          v-for="(item, index) in getRolesByProjectId(getProject._id)"
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
  name: 'ProjectAdministrators',
  components: { OakAutoComplete, Member },
  computed: {
    ...mapGetters([
      'getProject',
      'getUsers',
      'getUserById',
      'getRolesByProjectId',
    ]),
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
        type: 'ProjectAdministrator',
        domainId: this.getProject._id,
        userId: key,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.project-administrator {
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

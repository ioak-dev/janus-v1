<template>
  <div class="assigned-to">
    <div class="typography-4 form-element-label">
      Assign to
    </div>
    <div v-if="members && members.length > 0" class="view-content">
      <div class="container">
        <div class="member" v-for="member in members" :key="member._id">
          <Avatar v-bind:user="member" showName />
          <i class="material-icons" @click="$emit('remove', member._id)"
            >close</i
          >
        </div>
      </div>
    </div>
    <div class="edit-content">
      <OakAutoComplete
        v-bind:id="'search-assignee-' + Math.random()"
        @change="key => $emit('add', key)"
        label="Search team members to assign"
        v-bind:objects="peopleSearchList"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Avatar from '@/components/Avatar/Avatar.vue';
import OakAutoComplete from '@/oakui/OakAutoComplete.vue';
export default {
  name: 'Assignee',
  props: {
    assignedTo: Array,
    projectId: String,
    label: String,
  },
  data: function() {
    return {
      searchText: '',
    };
  },
  components: {
    Avatar,
    OakAutoComplete,
  },
  computed: {
    ...mapGetters([
      'getUserById',
      'getTeamMembersByTeamIdList',
      'getProjectTeamsByProjectId',
    ]),
    members: function() {
      const memberList = [];
      console.log(this.assignedTo);
      this.assignedTo?.forEach(item => memberList.push(this.getUserById(item)));
      return memberList;
    },
    teams: function() {
      return this.getProjectTeamsByProjectId(this.projectId).map(
        item => item.teamId
      );
    },
    peopleList: function() {
      const team = this.getTeamMembersByTeamIdList(this.teams);
      const people = [];
      team?.forEach(item => {
        const userItem = this.getUserById(item.userId);
        people.push({
          key: userItem._id,
          value: `${userItem.firstName} ${userItem.lastName}`,
        });
      });
      return people;
    },
    peopleSearchList: function() {
      return this.peopleList.filter(item =>
        item.value?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    handlePeopleSearch: function() {
      this.searchText = event.target.value;
    },
  },
};
</script>
<style lang="scss" scoped>
.assigned-to {
  // margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  .view-content {
    margin: 4px 0;

    // width: 100%;
    .container {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: flex-start;
      .member {
        background-color: var(--color-background-5);
        margin: 5px 10px;
        display: flex;
        align-items: center;
        border-radius: 4px;
        padding: 4px;
        .material-icons {
          margin-left: 4px;
          cursor: pointer;
          &:hover {
            color: var(--color-failure);
          }
        }
      }
    }
  }
  .edit-content {
    display: inline-block;
    width: 100%;
  }
}
</style>

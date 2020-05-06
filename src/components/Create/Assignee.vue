<template>
  <div class="assigned-to">
    <div class="typography-4 form-element-label">
      {{ label ? label : null }}
    </div>
    <div v-if="user" class="view-content">
      <div class="container">
        <Avatar v-bind:user="user" showName />
        <i class="material-icons" @click="$emit('remove')">close</i>
      </div>
    </div>
    <div v-else class="edit-content">
      <OakAutoComplete
        v-bind:id="'search-assignee-' + Math.random()"
        @change="key => $emit('change', key)"
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
    id: String,
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
    user: function() {
      return this.getUserById(this.id);
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
  .view-content {
    border: 1px solid var(--color-background-2);
    border-radius: 4px;
    margin: 4px 0;
    padding: 4px;
    display: inline-block;
    .container {
      display: flex;
      align-items: center;
      .material-icons {
        margin-left: 4px;
        cursor: pointer;
        &:hover {
          color: var(--color-failure);
        }
      }
    }
  }
  .edit-content {
    display: inline-block;
  }
}
</style>

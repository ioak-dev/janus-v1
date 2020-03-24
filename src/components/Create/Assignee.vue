<template>
  <div class="assigned-to">
    <div class="typography-5 form-element-label">Assigned To</div>
    <div v-if="user" class="view-content">
      <div class="container">
        <Avatar v-bind:user="user" showName />
        <i class="material-icons" @click="$emit('remove')">close</i>
      </div>
    </div>
    <div v-else class="edit-content">
      <OakAutoComplete
        v-bind:id="'search-assignee-' + Math.random()"
        label="Search team members"
        @search="handlePeopleSearch"
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
    teamId: String,
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
    ...mapGetters(['getUserById', 'findTeamById']),
    user: function() {
      return this.getUserById(this.id);
    },
    peopleList: function() {
      const team = this.findTeamById(this.teamId);
      const people = [];
      team?.members.forEach(userId => {
        const userItem = this.getUserById(userId);
        people.push({ key: userItem._id, value: userItem.name });
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
  margin-bottom: 20px;
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

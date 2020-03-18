<template>
  <div class="app-content">
    <div class="team-members">
      <ClickAndEditText
        v-bind:data="data"
        id="name"
        label="Team Name"
        v-bind:alwaysEditFields="[]"
        @change="handleChange"
      />
      <OakAutoComplete
        label="Search People"
        @search="handlePeopleSearch"
        @change="handlePeopleChange"
        v-bind:objects="peopleSearchList"
      />
      <div class="members">
        <div class="member" v-for="member in data.members" v-bind:key="member">
          {{
            getUserById(member) ? getUserById(member).name : getUserById(member)
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import OakAutoComplete from '@/oakui/OakAutoComplete.vue';
import ClickAndEditText from '@/components/Lib/ClickAndEditText.vue';
export default {
  name: 'TeamMembers',
  components: { OakAutoComplete, ClickAndEditText },
  data: function() {
    return {
      data: {
        name: '',
        members: [],
      },
      searchText: '',
    };
  },
  computed: {
    ...mapGetters(['getTeam', 'getUsers', 'getUserById']),
    peopleList: function() {
      const people = [];
      this.getUsers?.forEach(item => {
        people.push({ key: item._id, value: item.name });
      });
      return people;
    },
    peopleSearchList: function() {
      return this.peopleList.filter(item =>
        item.value?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  created() {
    this.data = { ...this.data, ...this.getTeam };
  },
  watch: {
    getTeam: function() {
      this.data = { ...this.data, ...this.getTeam };
    },
  },
  methods: {
    ...mapActions(['saveTeam']),
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    save: function() {
      this.saveTeam(this.data);
    },
    handlePeopleSearch: function() {
      console.log('handlePeopleSearch');
      this.searchText = event.target.value;
    },
    handlePeopleChange: function(key) {
      console.log(key);
      if (!this.data.members) {
        this.data.members = [key];
      } else {
        this.data.members.push(key);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.team-members {
  padding: 100px;
  height: calc(100vh - 60px);
  .member {
    padding: 10px 0px;
    border-bottom: 1px solid var(--color-body-dim);
  }
}
</style>

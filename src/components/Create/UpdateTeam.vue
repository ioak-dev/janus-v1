<template>
  <div>
    <div class="modal-body">
      <div class="formelement-label">Team name</div>
      <OakText v-bind:data="data.name" id="name" @change="handleChange" />
      <div class="formelement-label">Search Members</div>
      <OakAutoComplete
        @search="handlePeopleSearch"
        @change="handlePeopleChange"
        v-bind:objects="peopleSearchList"
        id="people-search-update-team"
      />
      <div class="members">
        <div class="member" v-for="member in data.members" v-bind:key="member">
          {{
            getUserById(member)
              ? `${getUserById(member).firstName} ${
                  getUserById(member).lastName
                }`
              : getUserById(member)
          }}
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <OakButton
        theme="primary"
        variant="animate in"
        @click="save"
        label="Save"
      />
    </div>
  </div>
</template>
<script>
import OakButton from '@/oakui/OakButton.vue';
import { mapActions, mapGetters } from 'vuex';
import OakAutoComplete from '@/oakui/OakAutoComplete.vue';
import OakText from '@/oakui/OakText.vue';

export default {
  name: 'UpdateTeam',
  components: {
    OakButton,
    OakText,
    OakAutoComplete,
  },
  props: {
    visible: Boolean,
    team: Object,
    alwaysEditFields: {
      type: Array,
      default: function() {
        return ['name'];
      },
    },
  },
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
        people.push({
          key: item._id,
          value: `${item.firstName} ${item.lastName}`,
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
  created() {
    this.data = { ...this.team };
  },
  watch: {
    getTeam: function() {
      this.data = { ...this.team };
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
      this.searchText = event.target.value;
    },
    handlePeopleChange: function(key) {
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
.member {
  padding: 10px 0px;
  border-bottom: 1px solid var(--color-background-2);
}
</style>

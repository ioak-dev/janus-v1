<template>
  <div>
    <div>
      <OakText
        v-bind:data="data.name"
        id="name"
        label="Team name"
        @change="handleChange"
      />
      <OakAutoComplete
        @change="handlePeopleChange"
        v-bind:objects="peopleSearchList"
        id="people-search-update-team"
        label="Search members"
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
    save: async function() {
      const outcome = await this.saveTeam(this.data);
      if (outcome) {
        this.$emit('success');
      } else {
        this.$emit('failure');
      }
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
.two-column {
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  row-gap: 20px;
  column-gap: 10px;
}
.member {
  padding: 10px 0px;
  border-bottom: 1px solid var(--color-background-2);
}
</style>

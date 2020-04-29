<template>
  <div class="team-members" v-bind:class="styleClass">
    <div class="container" v-if="getTeam">
      <div class="action">
        <OakButton
          label="Delete Team"
          theme="primary"
          variant="animate in"
          @click="toggleDeletePrompt"
        />
      </div>

      <div>
        <div class="typography-6">Name</div>
        <OakText v-bind:data="getTeam.name" id="name" @change="handleChange" />
      </div>
      <div>
        <div class="typography-6">Members</div>
        <OakAutoComplete
          @change="addMember"
          v-bind:objects="peopleList"
          placeholder="Type to search people"
          id="people-search"
        />
      </div>
      <div class="members">
        <div
          v-for="(item, index) in getTeamsMembersByTeamId(getTeam._id)"
          :key="index"
        >
          <Member v-bind:teamMember="item" v-bind:team="getTeam" />
        </div>
      </div>
    </div>
    <OakPrompt
      v-if="getTeam"
      v-bind:visible="showDeletePrompt"
      v-bind:text="`Are you sure you want to delete ${getTeam.name}?`"
      @click="remove"
      @close="toggleDeletePrompt"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import OakAutoComplete from '@/oakui/OakAutoComplete.vue';
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakPrompt from '@/oakui/OakPrompt.vue';
import Member from './Member.vue';
export default {
  name: 'TeamMembers',
  components: { OakAutoComplete, OakText, OakButton, OakPrompt, Member },
  data: function() {
    return {
      showDeletePrompt: false,
    };
  },
  computed: {
    ...mapGetters([
      'getTeam',
      'getUsers',
      'getUserById',
      'getTeamsMembersByTeamId',
    ]),
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
    ...mapActions(['saveTeam', 'deleteTeam', 'saveTeamMember']),
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    toggleDeletePrompt: function() {
      this.showDeletePrompt = !this.showDeletePrompt;
    },
    addMember: function(key) {
      this.saveTeamMember({ teamId: this.getTeam._id, userId: key });
    },
    remove: function() {
      this.deleteTeam(this.getTeam._id);
    },
  },
  watch: {
    getTeam: function() {
      if (this.getTeam?.image) {
        document.getElementsByClassName(
          'team-members'
        )[0].style.background = `url(${this.getTeam.image}) no-repeat center center`;
      }
    },
  },
  mounted() {
    if (this.getTeam?.image) {
      document.getElementsByClassName(
        'team-members'
      )[0].style.background = `url(${this.getTeam.image}) no-repeat center center`;
    }
  },
};
</script>
<style lang="scss" scoped>
.team-members {
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
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

<template>
  <div class="member">
    <div class="name">
      {{ member ? `${member.firstName} ${member.lastName}` : '' }}
    </div>
    <div class="action" v-if="confirmPrompt">
      <div class="confirm-prompt delete" @click="remove">Confirm</div>
      <div class="confirm-prompt" @click="toggleConfirmPrompt">
        Cancel
      </div>
    </div>
    <div class="action" v-else>
      <div class="confirm-prompt trigger" @click="toggleConfirmPrompt">
        X
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Member',
  props: { teamMember: Object, team: Object },
  data: function() {
    return {
      confirmPrompt: false,
    };
  },
  computed: {
    ...mapGetters(['getUserById']),
    member: function() {
      return this.getUserById(this.teamMember.userId);
    },
  },
  methods: {
    ...mapActions(['deleteTeamMember']),
    remove: function() {
      this.deleteTeamMember(this.teamMember._id);
      this.toggleConfirmPrompt();
    },
    toggleConfirmPrompt: function() {
      this.confirmPrompt = !this.confirmPrompt;
    },
  },
};
</script>
<style lang="scss" scoped>
.member {
  padding: 10px 0px;
  border-bottom: 1px solid var(--color-background-2);
  display: grid;
  grid-template-columns: 1fr auto;
  .action {
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;
    .material-icons {
      cursor: pointer;
    }

    .confirm-prompt {
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      background-color: var(--color-background-5);
      &.delete {
        background-color: var(--color-failure);
      }
      &.trigger {
        &:hover {
          background-color: var(--color-failure);
        }
      }
    }
  }
}
</style>

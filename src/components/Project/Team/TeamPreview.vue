<template>
  <div class="team-preview">
    <div class="content">
      <div class="name typography-6">{{ team.name }}</div>
      <div class="members-list">
        <div
          v-for="(item, index) in people"
          :key="item._id"
          class="typography-4"
        >
          <div v-if="index < 5">
            {{ `${item.firstName} ${item.lastName}` }}
          </div>
        </div>
        <div
          v-if="people.length > 5"
          class="members-link typography-4"
          @click="toggleMoreMembers"
        >
          {{ `+${people.length - 5} more` }}
        </div>
      </div>
    </div>
    <div class="actions">
      <div>
        <i class="material-icons" @click="toggleDeletePrompt">delete</i>
      </div>
    </div>
    <OakPrompt
      v-bind:visible="showDeletePrompt"
      v-bind:text="`Are you sure you want to remove team?`"
      @click="$emit('remove')"
      @close="toggleDeletePrompt"
    />
    <OakModal
      v-bind:visible="showMoreMembers"
      @close="toggleMoreMembers"
      v-bind:label="`Members of ${team.name}`"
    >
      <div slot="modal-body">
        <div class="more-members">
          <div
            v-for="item in people"
            :key="item._id"
            class="members-link typography-5"
          >
            {{ `${item.firstName} ${item.lastName}` }}
          </div>
        </div>
      </div>
    </OakModal>
  </div>
</template>
<script>
import OakPrompt from '@/oakui/OakPrompt.vue';
import OakModal from '@/oakui/OakModal.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'TeamPreview',
  components: { OakPrompt, OakModal },
  props: { id: String },
  data: function() {
    return {
      showDeletePrompt: false,
      showMoreMembers: false,
    };
  },
  computed: {
    ...mapGetters(['getProject', 'getUserById', 'findTeamById']),
    team: function() {
      return this.findTeamById(this.id);
    },
    people: function() {
      const people = [];
      this.team?.members?.forEach(userId => {
        const userItem = this.getUserById(userId);
        people.push(userItem);
      });
      return people;
    },
  },
  methods: {
    ...mapActions([]),
    toggleDeletePrompt: function() {
      this.showDeletePrompt = !this.showDeletePrompt;
    },
    toggleMoreMembers: function() {
      this.showMoreMembers = !this.showMoreMembers;
    },
  },
};
</script>
<style lang="scss" scoped>
.team-preview {
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: var(--color-background-3);
  padding: 10px;
  border-radius: 6px;
  .content {
    display: grid;
    row-gap: 20px;
    .members-link {
      user-select: none;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .members-list {
      display: grid;
      row-gap: 5px;
    }
  }
  .actions {
    user-select: none;
    .material-icons {
      cursor: pointer;
    }
  }
}
.more-members {
  display: grid;
  grid-auto-flow: row;
  row-gap: 20px;
}
</style>

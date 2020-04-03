<template>
  <div class="view-comment">
    <div class="top-row space-bottom-1">
      <div class="space-right-1">
        <Avatar v-bind:user="user" />
      </div>
      <div class="typography-4">
        <div class="user-name typography-4">{{ user.name }}</div>
        <div>{{ user.createdAt }}</div>
      </div>
    </div>
    <div class="content">{{ comment.text }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Avatar from '@/components/Avatar/Avatar.vue';
export default {
  name: 'ViewComment',
  props: {
    comment: Object,
  },
  components: { Avatar },
  computed: {
    ...mapGetters(['getUserById']),
    user: function() {
      return this.getUserById(this.comment.createdBy);
    },
  },
};
</script>
<style lang="scss" scoped>
.view-comment {
  background-color: var(--color-background-3);
  padding: 10px;
  margin: 0 20px;
  border-radius: 4px;
  .top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    .user-name {
      color: var(--color-primary-1);
    }
  }
}
</style>

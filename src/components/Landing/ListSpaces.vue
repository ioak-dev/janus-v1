<template>
  <div class="list-spaces typography-10">
    <div class="space-bottom-2">Choose your company space</div>
    <div class="list-spaces--container">
      <div
        v-for="item in getSpaces"
        v-bind:key="item._id"
        class="list-spaces--container--space typography-6"
        @click="chooseSpace(item.spaceId)"
      >
        {{ `${item.name} (${item.spaceId})` }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ListSpaces',
  props: {
    title: String,
    description: String,
  },
  computed: {
    ...mapGetters(['getSpaces']),
  },
  methods: {
    chooseSpace(spaceId) {
      this.$router.push({
        name: 'SpaceHomeDefault',
        params: { space: spaceId },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.list-spaces {
  .list-spaces--container {
    display: grid;
    grid-auto-flow: row;
    row-gap: 20px;
    .list-spaces--container--space {
      background-color: var(--color-background-4);
      padding: 20px 20px;
      border-radius: 6px;
      &:hover {
        cursor: pointer;
        background-color: var(--color-primary-1);
      }
    }
  }
}
</style>

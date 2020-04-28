<template>
  <div class="avatar" v-if="user">
    <AvatarImage
      v-if="user.avatar"
      v-bind:reference="user.avatar"
      v-bind:size="size"
    />
    <div v-else class="avatar-icon" v-bind:class="this.size">
      {{ user.firstName.substring(0, 1) }}{{ user.lastName.substring(0, 1) }}
    </div>
    <div v-if="showName" class="avatar-name">{{ user.firstName }}</div>
  </div>
</template>
<script>
import AvatarImage from './AvatarImage.vue';
export default {
  name: 'Avatar',
  props: {
    user: Object,
    showName: Boolean,
    size: String,
  },
  components: { AvatarImage },
};
</script>
<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  .avatar-icon {
    background-color: var(--color-primary-1);
    width: 36px;
    height: 36px;
    line-height: 36px;
    display: flex;
    justify-content: center;
    border-radius: 100%;

    &.large {
      width: 50px;
      height: 50px;
    }

    &.small {
      width: 28px;
      height: 28px;
    }
  }
  .avatar-name {
    margin-left: 6px;
  }
}
</style>

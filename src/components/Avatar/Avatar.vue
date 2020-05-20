<template>
  <div class="avatar" v-if="user">
    <AvatarImage
      v-if="user.avatar"
      v-bind:reference="user.avatar"
      v-bind:size="size"
    />
    <div v-else class="avatar-icon" v-bind:class="`${user.color} ${this.size}`">
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
    width: 36px;
    height: 36px;
    line-height: 36px;
    display: flex;
    justify-content: center;
    border-radius: 100%;
    color: #ffffff;
    &.large {
      width: 50px;
      height: 50px;
      line-height: 50px;
    }

    &.small {
      width: 28px;
      height: 28px;
      line-height: 28px;
    }

    &.color_1 {
      background-color: #6080bf;
    }
    &.color_2 {
      background-color: #a65a3f;
    }
    &.color_3 {
      background-color: #0da6a6;
    }
    &.color_4 {
      background-color: #5b548c;
    }
    &.color_5 {
      background-color: #53744f;
    }
    &.color_6 {
      background-color: #a29887;
    }
    &.color_7 {
      background-color: #dfc0ad;
    }
    &.color_8 {
      background-color: #518f80;
    }
    &.color_9 {
      background-color: #d96a6a;
    }
    &.color_10 {
      background-color: #f2c46d;
    }
  }
  .avatar-name {
    margin-left: 6px;
  }
}
</style>

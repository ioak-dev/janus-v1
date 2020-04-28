<template>
  <!-- <div class="avatar-image"> -->
  <!-- <img
      alt="Avatar"
      v-bind:src="`/avatars/${reference}.svg`"
      v-bind:class="this.size"
    /> -->
  <img
    alt="Avatar"
    v-bind:src="`/avatars/${reference}.svg`"
    v-bind:class="this.size"
  />
  <!-- </div> -->
</template>
<script>
export default {
  name: 'AvatarImage',
  props: { reference: Number, size: String },
};
</script>
<style lang="scss" scoped>
// .avatar-image {
img {
  margin: 0;
  width: 36px;
  height: 36px;
  padding: 1px;
  // border: 2px solid var(--color-foreground-1);
  border-radius: 50%;
  // background-color: white;

  &.large {
    width: 50px;
    height: 50px;
  }

  &.small {
    width: 28px;
    height: 28px;
  }
}
// }
</style>

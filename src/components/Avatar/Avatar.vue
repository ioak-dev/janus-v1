<template>
  <div class="avatar" v-if="user">
    <div class="avatar-icon">
      {{ user.firstName.substring(0, 1) }}{{ user.lastName.substring(0, 1) }}
    </div>
    <div v-if="showName" class="avatar-name">{{ user.firstName }}</div>
  </div>
</template>
<script>
export default {
  name: 'Avatar',
  props: {
    user: Object,
    showName: Boolean,
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  .avatar-icon {
    background-color: var(--color-primary-1);
    width: 30px;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: center;
    border-radius: 100%;
  }
  .avatar-name {
    margin-left: 6px;
  }
}
</style>

<template>
  <div class="avatar">{{ initials }}</div>
</template>
<script>
export default {
  name: 'Avatar',
  props: {
    initials: String,
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  background-color: var(--color-primary);
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  border-radius: 100%;
}
</style>

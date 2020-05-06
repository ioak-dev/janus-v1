<template>
  <div class="unauthorized">
    <div class="typography-10 space-top-5 space-bottom-2 title">
      <OakIcon mat="error" color="failure" size="100px" />
      <div class="text">
        Unauthorized
        <div class="typography-5">
          You don't have appropriate permissions to access the page you are
          trying to view
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OakIcon from '@/oakui/OakIcon.vue';
export default {
  name: 'Unauthorized',
  components: { OakIcon },
};
</script>
<style lang="scss" scoped>
.unauthorized {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .title {
    display: flex;
    align-items: center;
  }
}
</style>

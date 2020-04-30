<template>
  <div class="team">
    <div class="">{{ team.name }}</div>
    <div class="">Administrator</div>
  </div>
</template>
<script>
export default {
  name: 'Team',
  props: { team: Object },
};
</script>
<style lang="scss" scoped>
.team {
  background-color: var(--color-primary-1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: var(--bs-lg);
}
</style>

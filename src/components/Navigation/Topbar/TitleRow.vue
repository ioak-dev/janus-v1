<template>
  <div>
    <div v-if="getProject" class="title-row">{{ getProject.name }}</div>
    <div v-if="getTeam" class="title-row">{{ getTeam.name }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TitleRow',
  computed: {
    ...mapGetters(['getProject', 'getTeam']),
  },
};
</script>
<style lang="scss" scoped>
.title-row {
  height: 30px;
  line-height: 30px;
  font-size: 1.5em;
}
</style>

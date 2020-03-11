<template>
  <div v-if="getProject" class="title-row">{{ getProject.name }}</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TitleRow',
  computed: {
    ...mapGetters(['getProject']),
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

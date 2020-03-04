<template>
  <div class="create-space boxed">
    <CreateSpaceForm />
  </div>
</template>
<script>
import CreateSpaceForm from './CreateSpaceForm.vue';
export default {
  name: 'CreateSpace',
  components: {
    CreateSpaceForm,
  },
};
</script>
<style lang="scss" scoped>
.create-space {
  // background: url('../../assets/space_creation.jpg') no-repeat center center;
}
</style>

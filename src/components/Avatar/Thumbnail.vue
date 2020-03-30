<template>
  <div class="thumbnail">
    <img v-bind:src="url" />
  </div>
</template>
<script>
export default {
  name: 'Thumbnail',
  props: {
    url: String,
  },
};
</script>
<style lang="scss" scoped>
.thumbnail {
  display: flex;
  img {
    height: 50px;
    width: auto;
    border-radius: 10px;
  }
}
</style>

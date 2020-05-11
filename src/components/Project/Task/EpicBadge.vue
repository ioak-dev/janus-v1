<template>
  <div class="epic-badge one-liner" v-if="epic" v-bind:class="epic.color">
    {{ `${epic.taskId}: ${epic.title} ${epic.color}` }}
  </div>
</template>
<script>
export default {
  name: 'EpicBadge',
  props: { epic: Object },
};
</script>
<style lang="scss" scoped>
.epic-badge {
  border-radius: 4px;
  padding: 0 10px;
  &.color_1 {
    background-color: #8447ff;
  }
  &.color_2 {
    background-color: #1c6e8c;
  }
  &.color_3 {
    background-color: #b75d69;
  }
  &.color_4 {
    background-color: #4fb477;
  }
  &.color_5 {
    background-color: #7ca982;
  }
  &.color_6 {
    background-color: #ee7674;
  }
  &.color_7 {
    background-color: #bbbe64;
  }
  &.color_8 {
    background-color: #d95d39;
  }
  &.color_9 {
    background-color: #7392b7;
  }
  &.color_10 {
    background-color: #86deb7;
  }
}
</style>

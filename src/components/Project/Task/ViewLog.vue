<template>
  <div class="view-log">
    <div class="header-row typography-5">
      <div>Field</div>
      <div>From</div>
      <div>To</div>
      <div>Changed by</div>
      <div>Changed at</div>
    </div>
    <div class="log-row" v-for="item in logs" v-bind:key="item._id">
      <div>{{ item.field }}</div>
      <div>
        <Avatar
          showName
          v-if="item.field === 'assignedTo' && getUserById(item.before)"
          v-bind:user="getUserById(item.before)"
        />
        <div v-else>{{ item.before }}</div>
      </div>
      <div>
        <Avatar
          showName
          v-if="item.field === 'assignedTo' && getUserById(item.after)"
          v-bind:user="getUserById(item.after)"
        />
        <div v-else>{{ item.after }}</div>
      </div>
      <div>
        <Avatar
          showName
          v-if="getUserById(item.createdBy)"
          v-bind:user="getUserById(item.createdBy)"
        />
      </div>
      <div>{{ item.createdAt }}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Avatar from '@/components/Avatar/Avatar.vue';
export default {
  name: 'ViewLog',
  props: {
    logs: Array,
  },
  components: { Avatar },
  computed: {
    ...mapGetters(['getUserById']),
  },
};
</script>
<style lang="scss" scoped>
.view-log {
  display: grid;
  grid-template-rows: auto;
  .log-row,
  .header-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
    padding: 10px;
    border-bottom: 1px solid var(--color-background-2);
  }
  .header-row {
    color: var(--color-primary-1);
  }
}
</style>

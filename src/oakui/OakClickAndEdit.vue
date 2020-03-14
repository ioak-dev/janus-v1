<template>
  <div class="oak-click-and-edit">
    <div v-if="showEdit" v-bind:id="`oak-click-and-edit-${id}`">
      <slot name="edit-content"></slot>
    </div>
    <div v-else @click="show" class="view-content-container">
      <slot name="view-content"></slot>
    </div>
  </div>
</template>
<script>
import { receiveMessage } from '@/events/MessageService';
export default {
  name: 'OakClickAndEdit',
  props: {
    id: String,
    alwaysView: Boolean,
    alwaysEdit: Boolean,
  },
  created() {
    receiveMessage().subscribe(message => {
      if (message.name === 'blur' && message.data.id === this.id) {
        this.hide();
      }
    });
  },
  data: function() {
    return {
      showEdit: this.alwaysEdit ? true : false,
    };
  },
  methods: {
    show: function() {
      this.showEdit = this.alwaysView ? false : true;
    },
    hide: function() {
      this.showEdit = this.alwaysEdit ? true : false;
    },
  },
};
</script>
<style lang="scss" scoped>
.view-content-container {
  margin-bottom: 20px;
}
</style>

<template>
  <div>
    <div v-for="item in getAttachmentsForTask" v-bind:key="item._id">
      <AttachmentLink v-bind:data="item" />
    </div>
    <OakAttach @change="handleChange" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakAttach from '@/oakui/OakAttach.vue';
import AttachmentLink from './AttachmentLink.vue';
export default {
  name: 'Attachment',
  components: { OakAttach, AttachmentLink },
  props: { task: Object },
  computed: {
    ...mapGetters(['getAttachmentsForTask']),
  },
  mounted() {
    if (this.task) {
      this.fetchTaskAttachments(this.task._id);
    }
  },
  watch: {
    task: function() {
      this.fetchTaskAttachments(this.task._id);
    },
  },
  methods: {
    ...mapActions(['saveTaskAttachment', 'fetchTaskAttachments']),
    handleChange: function(files) {
      files.forEach(file => {
        this.saveTaskAttachment({ taskId: this.task._id, attachment: file });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

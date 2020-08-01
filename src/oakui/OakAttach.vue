<template>
  <div class="oak-attach">
    <div
      class="drop-container"
      v-bind:class="dragClass"
      @dragover.prevent="dragOver"
      @drop.prevent="drop"
      @dragleave="dragLeave"
    >
      <div><i class="material-icons">cloud_upload</i></div>
      <div>Drop your files here</div>
      <div>or</div>
      <div class="file-input">
        <label class="file-upload space-top-1 space-bottom-4">
          <input
            type="file"
            @change="chooseFiles"
            multiple="multiple"
            required
          />
          <div class="action">
            <i class="material-icons">attach_file</i>
            <div class="text">Browse</div>
          </div>
        </label>
      </div>
    </div>
    <div class="file-names">
      <div v-for="item in files" v-bind:key="item.name" class="typography-3">
        {{ item.name }}
      </div>
    </div>
    <!-- <div class="file-input">
      <label class="file-upload space-top-1 space-bottom-4">
        <input type="file" @change="chooseFiles" multiple="multiple" required />
        <i class="material-icons">attach_file</i>
        Browse
      </label>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'OakAttach',
  data: function() {
    return {
      dragClass: '',
      files: [],
    };
  },
  methods: {
    dragOver(e) {
      this.dragClass = 'dropping';
    },
    dragLeave(e) {
      this.dragClass = '';
    },
    drop(e) {
      this.dragClass = '';
      this.processFiles(e.dataTransfer.files);
      this.dragClass = '';
    },
    chooseFiles(e) {
      this.processFiles(e.target.files);
    },
    processFiles(files) {
      this.files = files;
      this.$emit('change', files);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './styles/oak-attach.scss';
</style>

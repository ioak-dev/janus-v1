<template>
  <div class="attachment-link">
    <div class="attachment-row">
      <div class="left">
        <div class="icon"><i class="material-icons">attach_file</i></div>
        <div class="filename" @click="downloadAttachment">
          {{ `${data.name} (${humanReadableByteSize(data.size)})` }}
        </div>
      </div>
      <div class="right">
        <OakButton
          label="delete"
          theme="primary"
          variant="appear"
          @click="toggleDeletePrompt"
        ></OakButton>
      </div>
    </div>
    <OakPrompt
      v-bind:visible="showDeletePrompt"
      v-bind:text="
        `Are you sure you want to delete the attachment? (${data.name})`
      "
      @click="removeAttachment"
      @close="toggleDeletePrompt"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import OakButton from '@/oakui/OakButton.vue';
import OakPrompt from '@/oakui/OakPrompt.vue';

const baseUrl = process.env.VUE_APP_ROOT_API;
export default {
  name: 'AttachmentLink',
  props: { data: Object },
  computed: {
    ...mapGetters(['getProfile']),
  },
  data: function() {
    return {
      showDeletePrompt: false,
    };
  },
  components: { OakButton, OakPrompt },
  methods: {
    ...mapActions(['deleteTaskAttachment']),
    toggleDeletePrompt: function() {
      this.showDeletePrompt = !this.showDeletePrompt;
    },
    humanReadableByteSize: function(bytes) {
      if (bytes == 0) {
        return '0.00 B';
      }
      const e = Math.floor(Math.log(bytes) / Math.log(1024));
      return (
        (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B'
      );
    },
    base64ToArrayBuffer: function(content) {
      const binaryString = window.atob(content);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    },
    removeAttachment: function() {
      this.deleteTaskAttachment({
        taskId: this.data.taskId,
        attachmentId: this.data._id,
      });
    },
    downloadAttachment: function() {
      axios
        .get(
          `${baseUrl}/attachment/task/${this.getProfile.space}/${this.data._id}`,
          {
            headers: {
              Authorization: `${this.getProfile.auth.token}`,
            },
          }
        )
        .then(response => {
          const blob = new Blob([this.base64ToArrayBuffer(response.data)], {
            type: 'application/pdf',
          });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = this.data.name;
          link.click();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.attachment-link {
  margin: 10px 0;
  width: auto;
  .attachment-row {
    padding: 10px;
    border-radius: 6px;
    background-color: var(--color-background-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: row;
      .filename {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .right {
      visibility: hidden;
    }

    &:hover .right {
      visibility: visible;
    }
  }
}
</style>

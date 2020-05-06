<template>
  <div>
    <div class="modal-body form">
      <OakSelect
        v-bind:data="data.type"
        id="type"
        @change="handleChange"
        label="Project methodology"
        v-bind:elements="['Kanban', 'Scrum']"
      />
      <OakText
        v-bind:data="data.name"
        id="name"
        label="Project name"
        @change="handleChange"
      />
    </div>
    <div class="modal-footer">
      <OakButton
        theme="primary"
        variant="animate in"
        @click="save"
        label="Save"
      />
    </div>
  </div>
</template>
<script>
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakSelect from '@/oakui/OakSelect.vue';
import { mapActions } from 'vuex';

export default {
  name: 'UpdateProject',
  components: {
    OakText,
    OakButton,
    OakSelect,
  },
  props: {
    project: Object,
  },
  data: function() {
    return {
      data: {},
    };
  },
  created() {
    this.data = { ...this.project };
  },
  watch: {
    project: function() {
      this.data = { ...this.project };
    },
  },
  methods: {
    ...mapActions(['saveProject']),
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    save: async function() {
      const outcome = await this.saveProject(this.data);
      if (outcome) {
        this.$emit('success');
      } else {
        this.$emit('failure');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div>
    <div class="two-column">
      <div class="typography-4">Project Methodology</div>
      <OakSelect
        v-bind:data="data.type"
        id="type"
        @change="handleChange"
        v-bind:elements="['Kanban', 'Scrum']"
      />
      <div class="typography-4">Project</div>
      <OakText v-bind:data="data.name" id="name" @change="handleChange" />
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
    save: function() {
      this.saveProject(this.data);
    },
  },
};
</script>
<style lang="scss" scoped>
.two-column {
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  row-gap: 20px;
  column-gap: 10px;
}
</style>

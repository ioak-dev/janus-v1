<template>
  <div class="oak-auto-complete" v-bind:id="id">
    <div class="search-bar">
      <OakText
        id="auto-complete"
        v-bind:label="label"
        v-bind:placeholder="placeholder"
        @focus="onFocus"
        @change="$emit('search')"
      />
    </div>
    <div class="results" v-if="isSearchOn">
      <div
        class="element"
        v-for="item in objects"
        v-bind:key="item.key"
        @click="selected(item.key)"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>
<script>
import OakText from '@/oakui/OakText.vue';
export default {
  name: 'OakAutoComplete',
  components: { OakText },
  props: {
    label: String,
    placeholder: String,
    objects: Array,
    id: String,
  },
  data: function() {
    return {
      isSearchOn: false,
    };
  },
  created() {
    window.addEventListener('click', e => {
      // console.log(e.target, document.getElementById(this.id), this.id);
      // console.log(
      //   document
      //     .getElementById(this.id)
      //     .querySelector('.oak-popover-menu-label').classList
      // );
      if (!document.getElementById(this.id)?.contains(e.target)) {
        this.isSearchOn = false;
      }
    });
  },
  methods: {
    // onBlur() {
    //   console.log('blur');
    //   console.log(event.target);
    //   this.isSearchOn = false;
    // },
    onFocus() {
      this.isSearchOn = true;
    },
    selected(key) {
      this.isSearchOn = false;
      this.$emit('change', key);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './styles/oak-auto-complete.scss';
</style>

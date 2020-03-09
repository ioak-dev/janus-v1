<template>
  <div class="oak-popover-menu" :class="style" v-bind:id="id">
    <div class="label" @click="toggle" :class="show ? 'active' : ''">
      <div class="left-icon">
        <slot name="left-icon" class="left-icon"></slot>
      </div>
      {{ label }}
      <div class="right-icon">
        <slot name="right-icon" class="right-icon"></slot>
      </div>
    </div>
    <div
      class="dropdown-content"
      v-bind:class="dropdownContentStyle"
      @click="toggle"
    >
      <p>option number 1 2 3</p>
      <p>optionn umbertwo opt ionn umber two</p>
      <p>opt1</p>
      <p>opt1</p>
      <p>opt2</p>
      <p>opt2</p>
      <p>opt2</p>
      <p>opt2</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OakSelect',
  props: {
    id: String,
    label: String,
    handleChange: Function,
    error: Boolean,
    data: String,
    elements: Array,
    objects: Array,
    first: String,
    firstAction: String,
    variant: String,
    theme: String,
    right: Boolean,
  },
  data() {
    return {
      style: this.getStyle(),
      show: false,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    getStyle() {
      let style = this.theme ? this.theme : '';
      style += this.variant ? ` ${this.variant}` : '';
      style += this.width ? ` ${this.width}` : '';
      return style;
    },
    changeSelection(newValue) {
      event.target.name = this.id;
      event.target.value = newValue;
      this.$emit('change', event);
      this.toggle();
    },
  },
  computed: {
    dropdownContentStyle: function() {
      let style = this.show ? 'show' : 'hide';
      style += this.right ? ' right' : '';
      return style;
    },
  },
  created() {
    window.addEventListener('click', e => {
      if (!document.getElementById(this.id)?.contains(e.target)) {
        this.show = false;
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.oak-popover-menu {
  position: relative;
  box-sizing: border-box;
  user-select: none;
  .label {
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    padding: 0px 20px;
    border-radius: 4px;
    &.active,
    &:hover {
      background-color: var(--color-body-dim);
    }
    .material-icons {
      line-height: 26px;
      vertical-align: middle;
    }
    .left-icon {
      margin-right: 6px;
      display: inline;
    }
    .right-icon {
      margin-left: 10px;
      display: inline;
    }
  }
  .dropdown-content {
    position: absolute;
    padding: 8px 0px;
    background-color: var(--color-body);
    // box-shadow: 0 0 0 1px rgba(111, 119, 130, 0.15),
    //   0 5px 20px 0 rgba(234, 228, 217, 0.08);
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    // max-width: 200px;
    max-height: 200px;
    overflow-y: auto;
    p {
      cursor: pointer;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0px 20px;
      height: 30px;
      line-height: 30px;
      &:hover {
        background-color: var(--color-body-dim);
      }
    }
    &.show {
      display: block;
    }
    &.hide {
      display: none;
    }
    &.right {
      right: 0;
    }
  }
}
</style>

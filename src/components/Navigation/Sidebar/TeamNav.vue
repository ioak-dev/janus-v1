<template>
  <div class="navigation">
    <div class="headline" @click="toggle">
      <div>Teams</div>
      <div>
        <i
          class="material-icons"
          v-bind:class="isExpanded ? 'showless' : 'showmore'"
          >expand_more</i
        >
      </div>
    </div>
    <div class="container" ref="container">
      <div
        v-for="team in getTeams"
        v-bind:key="team._id"
        class="team-container"
      >
        <router-link
          v-bind:to="`/${getProfile.space}/${team._id}/team/members`"
          v-bind:class="
            $route.path.startsWith(`/${getProfile.space}/${team._id}`)
              ? 'team-route-active'
              : ''
          "
        >
          {{ team.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TeamNav',
  data: function() {
    return {
      isExpanded: true,
    };
  },
  mounted() {
    this.updateScrollHeight();
  },
  computed: {
    ...mapGetters(['getProfile', 'getTeams']),
  },
  methods: {
    toggle: function() {
      this.isExpanded = !this.isExpanded;
    },
    updateScrollHeight: function() {
      setTimeout(() => {
        if (this.isExpanded) {
          this.$refs.container.style.maxHeight =
            this.$refs.container.scrollHeight + 'px';
        } else {
          this.$refs.container.style.maxHeight = 0 + 'px';
        }
      }, 0);
    },
  },
  watch: {
    getTeams: function() {
      this.updateScrollHeight();
    },
    isExpanded: function() {
      this.updateScrollHeight();
    },
  },
};
</script>
<style lang="scss" scoped>
.navigation {
  user-select: none;
  display: flex;
  flex-direction: column;
  // border-top: 1px solid var(--color-background-2);
  // border-bottom: 1px solid var(--color-background-2);
  // padding: 10px 0px;
  a {
    text-decoration: none;
    color: #fcfcfc;
    padding: 0 10px 0 15px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    &:hover {
      background-color: var(--color-nav-hover);
    }
    &.team-route-active {
      background-color: var(--color-primary-1);
    }
  }
  .headline {
    padding: 5px 15px;
    height: 28px;
    line-height: 28px;
    color: #fcfcfc;
    font-size: 0.9em;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    .material-icons {
      line-height: 28px;
      &:hover {
        color: var(--color-foreground-1);
      }
    }
    &:hover {
      color: var(--color-foreground-1);
    }
  }
  .container {
    overflow: hidden;
    transition: max-height 250ms ease-in-out;
  }
}
</style>

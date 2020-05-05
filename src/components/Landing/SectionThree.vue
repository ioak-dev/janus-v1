<template>
  <div class="section-three">
    <div class="left"></div>
    <div class="right">
      <div class="typography-12 space-bottom-2">Free and open source</div>
      <div class="typography-8">
        Janus is created to provide the powerful features of agile management
        tools totally free for the community
      </div>
    </div>
  </div>
</template>
<script>
import OakButton from '@/oakui/OakButton.vue';
export default {
  name: 'SectionThree',
  methods: {
    createSpace: function() {
      window.location.href = `${process.env.VUE_APP_ONEAUTH_URL}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.section-three {
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr;
  }
  background-color: #2c6258;
  .left {
    background: url('../../assets/landing/opensource.jpg') no-repeat center
      center;
    background-size: cover;
    @media (max-width: 767px) {
      display: none;
    }
  }
  .right {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

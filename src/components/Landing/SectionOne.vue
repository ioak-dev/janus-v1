<template>
  <div class="section-one">
    <Navigation />
    <div class="container">
      <div class="text">
        <div class="title">Agile management tool</div>
        <div class="subtitle">
          Manage your agile software workflow (be it Scrum or Kanban) with the
          clean and visually feature rich application, thereby increasing the
          speed and collaboration of your project teams
        </div>
      </div>
      <div class="action">
        <OakButton label="Start today" theme="primary" variant="animate none" />
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from './Navigation.vue';
import OakButton from '@/oakui/OakButton.vue';
export default {
  name: 'SectionOne',
  components: { OakButton, Navigation },
};
</script>
<style lang="scss" scoped>
.section-one {
  height: 600px;

  background: url('../../assets/landing/home.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;

  .container {
    display: grid;
    // flex-direction: column;
    justify-items: center;
    row-gap: 20px;
    // align-items: center;
    grid-auto-flow: row;
    width: 80%;
    @media (max-width: 767px) {
      width: 95%;
    }

    margin: auto;
    .text {
      background-color: var(--color-background-transparent-6);
      display: grid;
      grid-auto-flow: row;
      justify-items: center;
      row-gap: 20px;
      padding: 20px;
      text-align: center;
      border-radius: 6px;
      .title {
        font-size: 42px;
      }
      .subtitle {
        font-size: 20px;
      }
    }
  }
}
</style>

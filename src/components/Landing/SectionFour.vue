<template>
  <div class="section-four">
    <div class="container">
      <div class="text">
        <div class="title">Multiple views</div>
        <div class="subtitle">
          Rich user interface with a full preview of what is going on in the
          project at a glance
        </div>
      </div>
      <div class="screenshot" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SectionFour',
};
</script>
<style lang="scss" scoped>
.section-four {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px !important;

    margin: 10px;
    .screenshot {
      background: url('../../assets/landing/screenshot_list.png') no-repeat
        center center;
      background-size: cover;
      height: 400px;
      width: auto;
      margin: 20px;
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-size: 36px;
      }
      .subtitle {
        font-size: 20px;
      }
    }
  }
}
</style>

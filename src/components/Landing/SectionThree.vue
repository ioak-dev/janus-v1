<template>
  <div class="section-three">
    <div class="container">
      <div class="title">Key terms</div>
      <div class="sections">
        <div class="section">
          <div class="title">Epic</div>
          <div class="subtitle">
            Level up with Stack Overflow while you work. Share knowledge
            privately with your coworkers using our flagship Q&A engine.
          </div>
        </div>

        <div class="section">
          <div class="title">Story</div>
          <div class="subtitle">subtitle</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SectionThree',
};
</script>
<style lang="scss" scoped>
.section-three {
  .container {
    background-color: var(--color-background-4);
    // min-height: 400px;
    display: grid;
    grid-template-rows: auto 1fr;
    .title {
      font-size: 36px;
      display: flex;
      justify-content: center;
    }

    .sections {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 60px;
      margin: 40px;

      .section {
        padding: 20px;
        text-align: start;
        // border: 1px solid var(--color-foreground-5);
        background-color: var(--color-background-3);
        border-radius: 6px;
        box-shadow: var(--bs-lg);
      }
    }
  }
}
</style>

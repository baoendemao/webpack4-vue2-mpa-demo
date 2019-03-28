<template>
  <div class="home-container">
    <div class="go-list">
      <a :href="`/list.html`">go List</a>
    </div>
    <div class="go-detail">
      <a :href="`/detail.html`">go Detail</a>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  .home-container {
    width: 200px;
    height: 200px;
    display: flex;
    font-size: 20px;
    .go-list {
      flex: 1;
    }
    .go-detail {
      flex: 1;
    }
  }
</style>
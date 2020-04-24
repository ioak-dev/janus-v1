<template>
  <div class="image-search">
    <OakPagination
      v-bind:totalRows="getImagesPagination.total"
      @pageChanged="pageChanged"
      v-bind:pageSizes="['10', '20', '30']"
    />
    <div class="form-view">
      <OakText
        v-bind:data="searchText"
        placeholder="Search for background images"
        id="image-search-text"
        @change="handleSearchTextChange"
      />
      <OakButton
        @click="search"
        label="search"
        theme="primary"
        variant="animate in"
      />
    </div>
    <div class="search-results">
      <div class="thumb" v-for="item in getImages" v-bind:key="item.id">
        <img
          v-bind:src="item.urls.thumb"
          @click="chooseImage(item.urls.full)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import OakPagination from '@/oakui/OakPagination.vue';
export default {
  name: 'ImageSearch',
  components: { OakText, OakButton, OakPagination },
  data: function() {
    return {
      searchText: '',
      pageNo: 1,
      rowsPerPage: 10,
    };
  },
  mounted() {
    this.clearImages();
  },
  computed: {
    ...mapGetters(['getImages', 'getImagesPagination']),
  },
  methods: {
    ...mapActions(['searchImages', 'clearImages']),
    handleSearchTextChange: function() {
      this.searchText = event.target.value;
    },
    search: function() {
      this.searchImages({
        searchText: this.searchText,
        pageNo: this.pageNo,
        rowsPerPage: this.rowsPerPage,
      });
    },
    chooseImage: function(url) {
      this.$emit('click', url);
    },
    pageChanged: function(pageNo, rowsPerPage) {
      this.pageNo = pageNo;
      this.rowsPerPage = rowsPerPage;
      this.search();
    },
  },
};
</script>
<style lang="scss" scoped>
.image-search {
  .form-view {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr auto;
    column-gap: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .search-results {
    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: space-evenly;
    row-gap: 10px;
    column-gap: 10px;
    @media (max-width: 767px) {
      grid-template-columns: auto;
    }
    height: 80vh;
    overflow: auto;

    img {
      cursor: pointer;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid var(--color-primary-1);
      }
    }
  }
}
</style>

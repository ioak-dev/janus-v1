import axios from 'axios';

const state = {
  images: [],
  pagination: {
    total: 0,
    totalPages: 0,
  },
};

const getters = {
  getImages: (state: any) => {
    return state.images;
  },
  getImagesPagination: (state: any) => {
    return state.pagination;
  },
};

const actions = {
  async searchImages(
    { commit, dispatch, rootState }: any,
    { searchText, pageNo, rowsPerPage }: any
  ) {
    console.log(searchText, pageNo, rowsPerPage);
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?per_page=${rowsPerPage}&orientation=landscape&page=${pageNo}&query=${searchText}`,
      {
        headers: {
          Authorization:
            'Client-ID Xl_6B6bjPNClBPKmmj_uicb2KYmF9_4B-OTS-sl9J2o',
        },
      }
    );
    commit('UPDATE_IMAGES', response.data.results);
    commit('UPDATE_PAGINATION', {
      total: response.data.total,
      totalPages: response.data.total_pages,
    });
  },

  clearImages({ commit }: any) {
    commit('UPDATE_IMAGES', []);
    commit('UPDATE_PAGINATION', {
      total: 0,
      totalPages: 0,
    });
  },
};

const mutations = {
  UPDATE_IMAGES: (state: any, images: any) => {
    state.images = images;
  },
  UPDATE_PAGINATION: (state: any, pagination: any) => {
    state.pagination = pagination;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

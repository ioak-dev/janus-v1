import axios from 'axios';

const state = {
  spaces: [],
};

const baseUrl = process.env.VUE_APP_ONEAUTH_API;

const getters = {
  getSpaces: (state: any) => {
    return state.spaces;
  },
};

const actions = {
  async fetchSpaces({ commit, dispatch, rootState }: any) {
    const response = await axios.get(`${baseUrl}/space/introspect`);
    commit('UPDATE_SPACES', response.data.data);
  },
};

const mutations = {
  UPDATE_SPACES: (state: any, spaces: any) => {
    state.spaces = spaces;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import axios from 'axios';

const state = {
  stages: [],
};

const getters = {
  getStages: (state: any) => {
    return state.stages;
  },
};

const actions = {
  async fetchStages({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      'http://localhost:8000/stage/' +
        rootState.profile.space +
        '/' +
        rootState.project.project._id,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_STAGES', response.data.data);
  },
};

const mutations = {
  UPDATE_STAGES: (state: any, stages: any) => {
    state.stages = stages;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

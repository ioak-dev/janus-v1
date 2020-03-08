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
  async fetchStages({ commit }: { commit: any }) {
    const data: any = [];
    data.push({
      id: 1,
      projectId: 1,
      name: 'Selected for development',
    });
    data.push({
      id: 1,
      projectId: 1,
      name: 'In progress',
    });
    commit('UPDATE_STAGES', data);
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

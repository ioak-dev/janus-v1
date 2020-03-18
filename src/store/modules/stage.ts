import axios from 'axios';

const state = {
  stages: [],
};

const getters = {
  getStagesByProjectId: (state: any, rootState: any) => (projectId: string) => {
    let projectIdToSearch = projectId;
    if (!projectIdToSearch) {
      projectIdToSearch = rootState.getProject?._id;
    }
    if (projectIdToSearch) {
      return state.stages.filter(
        (item: any) => item.projectId === projectIdToSearch
      );
    }
    return [];
  },
};

const actions = {
  async fetchStages({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      'http://localhost:8000/stage/' + rootState.profile.space,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_STAGES', response.data.data);
  },
  async saveStage({ commit, dispatch, rootState }: any, payload: any) {
    const response = await axios.put(
      'http://localhost:8000/stage/' + rootState.profile.space + '/',
      payload,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    dispatch('fetchStages');
    // commit('UPDATE_PROJECTS', response.data.data);
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

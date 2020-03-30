import axios from 'axios';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  Task: [],
};

const getters = {
  getLogs: (state: any, rootState: any) => (domain: any) => {
    return state[domain];
  },
};

const actions = {
  async fetchLogs({ commit, dispatch, rootState }: any, payload: any) {
    const response = await axios.get(
      `${baseUrl}/log/${rootState.profile.space}/${payload.domain}/${payload.reference}`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_LOGS', { domain: payload.domain, logs: response.data.data });
  },
};

const mutations = {
  UPDATE_LOGS: (state: any, payload: any) => {
    state[payload.domain] = payload.logs;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

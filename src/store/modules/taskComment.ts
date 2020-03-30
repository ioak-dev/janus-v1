import axios from 'axios';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  comments: [],
};

const getters = {
  getCommentsForTask: (state: any, rootState: any) => {
    return state.comments;
  },
};

const actions = {
  async fetchTaskComments({ commit, dispatch, rootState }: any, taskId: any) {
    const response = await axios.get(
      `${baseUrl}/comment/task/${rootState.profile.space}/task/${taskId}`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_TASK_COMMENTS', response.data.data);
  },
  async saveTaskComment({ commit, dispatch, rootState }: any, payload: any) {
    const response = await axios.put(
      `${baseUrl}/comment/task/${rootState.profile.space}/`,
      payload,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    dispatch('fetchTaskComments', payload.taskId);
    // commit('UPDATE_PROJECTS', response.data.data);
  },
};

const mutations = {
  UPDATE_TASK_COMMENTS: (state: any, comments: any) => {
    state.comments = comments;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import axios from 'axios';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  checklistitems: [],
};

const getters = {
  getChecklistGroups: (state: any, rootState: any) => {
    const out: any[] = [];
    state.checklistitems.forEach((item: any) => {
      out.push(item.group);
    });
    return Array.from(new Set(out));
  },
  getChecklistItemsByGroup: (state: any, rootState: any) => (group: any) => {
    return state.checklistitems.filter((item: any) => item.group === group);
  },
};

const actions = {
  async fetchTaskChecklistitems(
    { commit, dispatch, rootState }: any,
    taskId: any
  ) {
    const response = await axios.get(
      `${baseUrl}/checklistitem/task/${rootState.profile.space}/task/${taskId}`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_TASK_CHECKLISTITEMS', response.data.data);
  },
  async saveTaskChecklistitem(
    { commit, dispatch, rootState }: any,
    payload: any
  ) {
    const response = await axios.put(
      `${baseUrl}/checklistitem/task/${rootState.profile.space}/`,
      payload,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    dispatch('fetchTaskChecklistitems', payload.taskId);
    // commit('UPDATE_PROJECTS', response.data.data);
  },
  async deleteTaskChecklistitem(
    { commit, dispatch, rootState }: any,
    { taskId, checklistitemId }: any
  ) {
    const response = await axios.delete(
      `${baseUrl}/checklistitem/task/${rootState.profile.space}/${checklistitemId}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    dispatch('fetchTaskChecklistitems', taskId);
  },
};

const mutations = {
  UPDATE_TASK_CHECKLISTITEMS: (state: any, checklistitems: any) => {
    state.checklistitems = checklistitems;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

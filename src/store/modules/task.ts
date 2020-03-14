import axios from 'axios';

const state = {
  tasks: Array<any>(),
};

const getters = {
  getTasks: (state: any) => {
    return state.tasks;
  },
  getTasksByStage: (state: any) => (stageId: string) => {
    return state.tasks.filter((item: any) => {
      return item.stageId === stageId;
    });
  },
};

const actions = {
  async fetchTasks({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      'http://localhost:8000/task/' +
        rootState.profile.space +
        '/' +
        rootState.project.project._id,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_TASKS', response.data.data);
  },
  async saveTask({ commit, dispatch, rootState }: any, payload: any) {
    const response = await axios.put(
      'http://localhost:8000/task/' +
        rootState.profile.space +
        '/' +
        payload.projectId,
      payload,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    // commit('UPDATE_PROJECTS', response.data.data);
    dispatch('fetchTasks');
  },
  async moveTask({ commit, dispatch, rootState }: any, payload: any) {
    // console.log(payload);
    // const afterItem = state.tasks.find(
    //   (item: any) => item._id === payload.afterItemId
    // );
    // const moveItem = state.tasks.find(
    //   (item: any) => item._id === payload.moveItemId
    // );
    // const servicePayload = {
    //   ...moveItem,
    //   stageId: afterItem.stageId,
    //   order: 2,
    // };
    const response = await axios.post(
      'http://localhost:8000/task/' +
        rootState.profile.space +
        '/' +
        rootState.project.project._id +
        '/move',
      payload,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    // commit('UPDATE_PROJECTS', response.data.data);
    dispatch('fetchTasks');
  },
};

const mutations = {
  UPDATE_TASKS: (state: any, tasks: any) => {
    state.tasks = tasks;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

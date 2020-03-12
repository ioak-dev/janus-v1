import axios from 'axios';

const state = {
  tasks: [],
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

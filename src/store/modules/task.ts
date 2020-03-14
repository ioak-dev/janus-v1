import axios from 'axios';
import { sendMessage } from '@/events/MessageService';

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
    sendMessage('spinner');
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
    sendMessage('spinner', false);
  },
  async saveTask({ commit, dispatch, rootState }: any, payload: any) {
    sendMessage('spinner');
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
    sendMessage('spinner', false);
    sendMessage('notification', true, {
      type: 'success',
      message: payload._id ? 'Task updated' : 'Task created',
      duration: 3000,
    });
    // commit('UPDATE_PROJECTS', response.data.data);
    dispatch('fetchTasks');
  },
  async moveTask({ commit, dispatch, rootState }: any, payload: any) {
    sendMessage('spinner');
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
    sendMessage('spinner', false);
    sendMessage('notification', true, {
      type: 'success',
      message: 'Task moved',
      duration: 3000,
    });
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

import axios from 'axios';
import { sendMessage, newMessageId } from '@/events/MessageService';

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
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: payload._id
        ? `Updating task (${payload.title.substring(0, 10)}..})`
        : `Creating task (${payload.title.substring(0, 10)}..})`,
    });
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
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: messageId,
        type: 'success',
        message: payload._id
          ? `Task (${payload.title.substring(0, 10)}..) updated`
          : `Task (${payload.title.substring(0, 10)}..) created`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: payload._id
          ? `Task (${payload.title.substring(0, 10)}..}) failed to update`
          : `Task (${payload.title.substring(0, 10)}..}) failed to create`,
      });
    }
    // commit('UPDATE_PROJECTS', response.data.data);
    dispatch('fetchTasks');
  },
  async moveTask({ commit, dispatch, rootState }: any, payload: any) {
    const moveTask = state.tasks.find(item => item._id === payload.moveTaskId);
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: `Moving task (${moveTask?.title.substring(0, 10)}..})`,
    });
    try {
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
      console.log(response.status);
      if (response.status === 200) {
        sendMessage('notification', true, {
          id: messageId,
          type: 'success',
          message: `Task (${moveTask?.title.substring(0, 10)}..) moved`,
          duration: 3000,
        });
      } else {
        sendMessage('notification', true, {
          id: messageId,
          type: 'failure',
          message: `Task (${moveTask?.title.substring(
            0,
            10
          )}..}) failed to move`,
        });
      }
      // commit('UPDATE_PROJECTS', response.data.data);
      dispatch('fetchTasks');
    } catch (error) {
      sendMessage('notification', true, {
        id: messageId,
        type: 'error',
        message: `Task (${moveTask?.title.substring(0, 10)}..) failed to move`,
      });
    }
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

import axios from 'axios';
import { sendMessage, newMessageId } from '@/events/MessageService';
import { isEmptyOrSpaces } from '@/Utils';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  tasks: Array<any>(),
  taskToView: Array<string>(),
};

const getters = {
  getTasks: (state: any) => {
    return state.tasks;
  },
  getEpicTasks: (state: any) => {
    return state.tasks.filter((item: any) => item.type === 'Epic');
  },
  getTasksByStage: (state: any) => (stageId: string) => {
    return state.tasks.filter((item: any) => {
      return item.stageId === stageId;
    });
  },
  getTasksByStageSorted: (state: any, rootState: any) => (
    stageId: string,
    sortCriteria: any,
    searchCriteria: any
  ) => {
    const unorderedTasksList = rootState
      .getTasksByStage(stageId)
      .filter((item: any) => {
        if (searchCriteria?.text) {
          if (
            (searchCriteria.field &&
              searchCriteria.text === item[searchCriteria.field]) ||
            item.title
              ?.toLowerCase()
              .includes(searchCriteria.text.toLowerCase()) ||
            item.taskId
              ?.toLowerCase()
              .includes(searchCriteria.text.toLowerCase())
          ) {
            return true;
          }
          return false;
        }
        return true;
      });
    if (isEmptyOrSpaces(sortCriteria.field)) {
      return unorderedTasksList;
    } else {
      return unorderedTasksList.sort(function(a: any, b: any) {
        let aLower = '';
        let bLower = '';
        if (sortCriteria.field === 'assignedTo') {
          const aUser = rootState.getUserById(a[sortCriteria.field]);
          const bUser = rootState.getUserById(b[sortCriteria.field]);
          aLower = aUser
            ? aUser.firstName?.toLowerCase() + aUser.lastName?.toLowerCase()
            : '';
          bLower = bUser
            ? bUser.firstName?.toLowerCase() + bUser.lastName?.toLowerCase()
            : '';
        } else {
          aLower = a[sortCriteria.field]?.toLowerCase();
          bLower = b[sortCriteria.field]?.toLowerCase();
        }
        if (aLower > bLower) {
          return sortCriteria.ascending ? 1 : -1;
        } else if (aLower < bLower) {
          return sortCriteria.ascending ? -1 : 1;
        } else {
          return 0;
        }
      });
    }
  },
  getTaskByTaskId: (state: any) => (taskId: string) => {
    return state.tasks.find((item: any) => {
      return item.taskId === taskId;
    });
  },
  getTaskById: (state: any) => (id: string) => {
    return state.tasks.find((item: any) => {
      return item._id === id;
    });
  },
  getTaskToView: (state: any) => {
    return state.taskToView;
  },
  getSubtasksByTaskId: (state: any) => (taskId: string) => {
    return state.tasks.filter((item: any) => {
      return item.parentTaskId === taskId;
    });
  },
};

const actions = {
  async fetchTasks({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      `${baseUrl}/task/${rootState.profile.space}/${rootState.project.project._id}`,
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
        ? `Updating task (${payload.taskId}})`
        : `Creating task (${payload.title.substring(0, 10)}..})`,
    });
    const response = await axios.put(
      `${baseUrl}/task/${rootState.profile.space}/${payload.projectId}`,
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
          ? `Task (${payload.taskId}) updated`
          : `Task (${payload.title.substring(0, 10)}..) created`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: payload._id
          ? `Task (${payload.taskId}}) failed to update`
          : `Task (${payload.title.substring(0, 10)}..}) failed to create`,
      });
    }
    // commit('UPDATE_PROJECTS', response.data.data);
    dispatch('fetchTasks');
    dispatch('fetchLogs', { domain: 'Task', reference: payload._id });
  },
  async moveTask({ commit, dispatch, rootState }: any, payload: any) {
    const moveTask = state.tasks.find(item => item._id === payload.moveTaskId);
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: `Moving task (${moveTask?.taskId}})`,
    });
    try {
      const response = await axios.post(
        `${baseUrl}/task/${rootState.profile.space}/${rootState.project.project._id}/move`,
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
          message: `Task (${moveTask?.taskId}) moved`,
          duration: 3000,
        });
      } else {
        sendMessage('notification', true, {
          id: messageId,
          type: 'failure',
          message: `Task (${moveTask?.taskId}}) failed to move`,
        });
      }
      // commit('UPDATE_PROJECTS', response.data.data);
      dispatch('fetchTasks');
    } catch (error) {
      sendMessage('notification', true, {
        id: messageId,
        type: 'error',
        message: `Task (${moveTask?.taskId}) failed to move`,
      });
    }
  },
  addTaskToView({ commit, dispatch, rootState }: any, payload: any) {
    if (!state.taskToView.includes(payload)) {
      commit('ADD_TASK_TO_VIEW', payload);
    }
  },
};

const mutations = {
  UPDATE_TASKS: (state: any, tasks: any) => {
    state.tasks = tasks;
  },
  ADD_TASK_TO_VIEW: (state: any, taskId: any) => {
    state.taskToView.push(taskId);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

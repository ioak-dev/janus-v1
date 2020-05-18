import axios from 'axios';
import {
  sendMessage,
  newMessageId,
  httpHandleRequest,
  httpHandleResponse,
  httpHandleError,
} from '@/events/MessageService';
import { isEmptyOrSpaces } from '@/Utils';
import { sessionSet, sessionGet } from '@/events/SessionService';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  tasks: Array<any>(),
  taskToView: Array<string>(),
};

const domain = 'Task';

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
        let outcome = true;
        searchCriteria?.forEach((searchParameter: any) => {
          if (!outcome) {
            return outcome;
          }
          if (searchParameter.field) {
            if (searchParameter.field === 'assignedTo') {
              if (
                item[searchParameter.field] &&
                item[searchParameter.field].includes(searchParameter.text)
              ) {
                outcome = true;
              } else {
                outcome = false;
              }
            } else if (searchParameter.text === item[searchParameter.field]) {
              outcome = true;
            } else {
              outcome = false;
            }
          } else if (
            item.title
              ?.toLowerCase()
              .includes(searchParameter.text.toLowerCase()) ||
            item.taskId
              ?.toLowerCase()
              .includes(searchParameter.text.toLowerCase())
          ) {
            outcome = true;
          } else {
            outcome = false;
          }
        });
        return outcome;
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
    const recentTasks = sessionGet(rootState.project?._id, 'recentTasks');
    commit('UPDATE_TASK_TO_VIEW', recentTasks ? recentTasks : []);
    commit('UPDATE_TASKS', response.data.data);
  },
  async saveTask({ commit, dispatch, rootState }: any, payload: any) {
    const action = 'Save Task';
    const messageId = newMessageId();
    httpHandleRequest(messageId, action, payload.title.substring(0, 10));
    try {
      const response = await axios.put(
        `${baseUrl}/task/${rootState.profile.space}/${payload.projectId}`,
        payload,
        {
          headers: {
            Authorization: `${rootState.profile.auth.token}`,
          },
        }
      );
      const outcome = httpHandleResponse(
        messageId,
        response,
        action,
        payload.title.substring(0, 10)
      );
      if (outcome) {
        dispatch('fetchTasks');
        dispatch('fetchLogs', { domain: 'Task', reference: payload._id });
      }
      return outcome;
    } catch (error) {
      return httpHandleError(
        messageId,
        error,
        action,
        payload.title.substring(0, 10)
      );
    }
  },
  async moveTask({ commit, dispatch, rootState }: any, payload: any) {
    const action = 'Move Task';
    const moveTask = state.tasks.find(item => item._id === payload.moveTaskId);
    const messageId = newMessageId();
    httpHandleRequest(messageId, action, moveTask?.taskId);
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
      const outcome = httpHandleResponse(
        messageId,
        response,
        action,
        moveTask?.taskId
      );
      if (outcome) {
        dispatch('fetchTasks');
      }
      return outcome;
    } catch (error) {
      return httpHandleError(messageId, error, action, moveTask?.taskId);
    }
  },
  addTaskToView({ commit, dispatch, rootState }: any, payload: any) {
    if (!state.taskToView.includes(payload)) {
      const taskList = state.taskToView;
      taskList.push(payload);
      commit('UPDATE_TASK_TO_VIEW', taskList);
      sessionSet(rootState.project?._id, 'recentTasks', taskList);
    }
  },
};

const mutations = {
  UPDATE_TASKS: (state: any, tasks: any) => {
    state.tasks = tasks;
  },
  UPDATE_TASK_TO_VIEW: (state: any, taskList: any) => {
    state.taskToView = taskList;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

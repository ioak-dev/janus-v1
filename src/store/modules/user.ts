import axios from 'axios';
import {
  newMessageId,
  sendMessage,
  httpHandleRequest,
  httpHandleError,
  httpHandleResponse,
} from '@/events/MessageService';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  users: [],
};

const getters = {
  getUsers: (state: any) => {
    return state.users;
  },
  getUserById: (state: any) => (id: string) => {
    return state.users.find((item: any) => item._id === id);
  },
  getUserByEmail: (state: any) => (email: string) => {
    return state.users.find((item: any) => item.email === email);
  },
};

const findUser = (userId: string) => {
  if (state.users?.length > 0) {
    const user = state.users.filter((element: any) => {
      return element._id === userId;
    });
    if (user.length === 1) {
      return user[0];
    } else {
      // console.log('Seleced user id is not present');
    }
  }
  return null;
};

const actions = {
  async fetchUsers({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      `${baseUrl}/user/${rootState.profile.space}/all`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_USERS', response.data.data);
  },
  async saveUser({ commit, dispatch, rootState }: any, payload: any) {
    const action = 'Save user profile';
    const messageId = newMessageId();
    httpHandleRequest(
      messageId,
      action,
      `${payload.firstName} ${payload.lastName}`.substring(0, 10)
    );
    try {
      const response = await axios.put(
        `${baseUrl}/user/${rootState.profile.space}/`,
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
        `${payload.firstName} ${payload.lastName}`.substring(0, 10)
      );
      if (outcome) {
        dispatch('fetchUsers');
      }
      return outcome;
    } catch (error) {
      return httpHandleError(
        messageId,
        error,
        action,
        `${payload.firstName} ${payload.lastName}`.substring(0, 10)
      );
    }
    // commit('UPDATE_PROJECTS', response.data.data);
  },
};

const mutations = {
  UPDATE_USERS: (state: any, users: any) => {
    state.users = users;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

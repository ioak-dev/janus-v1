import axios from 'axios';
import { newMessageId, sendMessage } from '@/events/MessageService';

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
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: payload._id
        ? `Updating user (${payload.name})`
        : `Creating user (${payload.name})`,
    });
    const response = await axios.put(
      `${baseUrl}/user/${rootState.profile.space}/`,
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
          ? `User (${payload.name}) updated`
          : `User (${payload.name}) created`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: payload._id
          ? `User (${payload.name}) failed to update`
          : `User (${payload.name}) failed to create`,
      });
    }
    // commit('UPDATE_PROJECTS', response.data.data);
    dispatch('fetchUsers');
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

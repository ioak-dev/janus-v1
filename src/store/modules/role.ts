import axios from 'axios';
import { sendMessage, newMessageId } from '@/events/MessageService';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  roles: [],
  didInitialize: false,
};

const getters = {
  getRoleInitializeStatus: (state: any) => {
    return function() {
      return state.didInitialize;
    };
  },
  getRolesByProjectId: (state: any) => (id: string) => {
    return state.roles.filter(
      (item: any) =>
        item.type === 'ProjectAdministrator' && item.domainId === id
    );
  },
  getRolesByTeamId: (state: any) => (id: string) => {
    return state.roles.filter(
      (item: any) => item.type === 'TeamAdministrator' && item.domainId === id
    );
  },
};

const actions = {
  async fetchRoles({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      `${baseUrl}/role/${rootState.profile.space}/`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_ROLES', response.data.data);
  },
  async deleteRole({ commit, dispatch, rootState }: any, id: string) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: `Deleting role (${id})`,
    });
    const response = await axios.delete(
      `${baseUrl}/role/${rootState.profile.space}/${id}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: messageId,
        type: 'success',
        message: `Role (${id}) deleted`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: `Role (${id}) failed to delete`,
      });
    }
    dispatch('fetchRoles');
  },
  async saveRole({ commit, dispatch, rootState }: any, payload: any) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: payload._id
        ? `Updating role (${payload.userId})`
        : `Creating role (${payload.userId})`,
    });
    const response = await axios.put(
      `${baseUrl}/role/${rootState.profile.space}/`,
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
          ? `Role (${payload.userId}) updated`
          : `Role (${payload.userId}) created`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: payload._id
          ? `Role (${payload.name}) failed to update`
          : `Role (${payload.name}) failed to create`,
      });
    }
    dispatch('fetchRoles');
  },
};

const mutations = {
  UPDATE_ROLES: (state: any, roles: any) => {
    state.roles = roles;
    state.didInitialize = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

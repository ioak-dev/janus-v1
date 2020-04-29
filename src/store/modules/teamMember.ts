import axios from 'axios';
import { sendMessage, newMessageId } from '@/events/MessageService';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  teamMembers: [],
};

const getters = {
  getTeamsMembers: (state: any) => {
    return state.teamMembers;
  },
  getTeamsMembersByUserId: (state: any) => (userId: string) => {
    return state.teamMembers.filter((item: any) => item.userId === userId);
  },
  getTeamsMembersByTeamId: (state: any) => (teamId: string) => {
    return state.teamMembers.filter((item: any) => item.teamId === teamId);
  },
  getTeamsMembersByTeamIdList: (state: any) => (teamIdList: any) => {
    return state.teamMembers.filter((item: any) =>
      teamIdList.includes(item.teamId)
    );
  },
};

const actions = {
  async fetchTeamMembers({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      `${baseUrl}/teammember/${rootState.profile.space}/`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_TEAM_MEMBERS', response.data.data);
  },
  async saveTeamMember({ commit, dispatch, rootState }: any, payload: any) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: `Adding team member (${payload.userId} - ${payload.teamId})`,
    });
    const response = await axios.post(
      `${baseUrl}/teammember/${rootState.profile.space}/${payload.teamId}/${payload.userId}`,
      null,
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
        message: `Added team member (${payload.userId} - ${payload.teamId})`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: `team member failed to create (${payload.userId} - ${payload.teamId})`,
      });
    }
    dispatch('fetchTeamMembers');
  },
  async deleteTeamMember({ commit, dispatch, rootState }: any, id: any) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: `Deleting team member (${id})`,
    });
    const response = await axios.delete(
      `${baseUrl}/teammember/${rootState.profile.space}/${id}`,
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
        message: `Deleted team member (${id})`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: `team member failed to delete (${id})`,
      });
    }
    dispatch('fetchTeamMembers');
  },
};

const mutations = {
  UPDATE_TEAM_MEMBERS: (state: any, teamMembers: any) => {
    state.teamMembers = teamMembers;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import axios from 'axios';
import { sendMessage, newMessageId } from '@/events/MessageService';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  projectTeams: [],
};

const getters = {
  getProjectTeams: (state: any) => {
    return state.projectTeams;
  },
  getProjectTeamsByProjectId: (state: any) => (projectId: string) => {
    return state.projectTeams.filter(
      (item: any) => item.projectId === projectId
    );
  },
  getProjectTeamsByTeamId: (state: any) => (teamId: string) => {
    return state.projectTeams.filter((item: any) => item.teamId === teamId);
  },
};

const actions = {
  async fetchProjectTeams({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      `${baseUrl}/projectteam/${rootState.profile.space}/`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_PROJECT_TEAMS', response.data.data);
  },
  async saveProjectTeam({ commit, dispatch, rootState }: any, payload: any) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: `Adding project team (${payload.teamId} - ${payload.projectId})`,
    });
    const response = await axios.post(
      `${baseUrl}/projectteam/${rootState.profile.space}/${payload.projectId}/${payload.teamId}`,
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
        message: `Added project team (${payload.teamId} - ${payload.projectId})`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: `Project team failed to create (${payload.teamId} - ${payload.projectId})`,
      });
    }
    dispatch('fetchProjectTeams');
  },
  async deleteProjectTeam({ commit, dispatch, rootState }: any, id: any) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: `Deleting project team (${id})`,
    });
    const response = await axios.delete(
      `${baseUrl}/projectteam/${rootState.profile.space}/${id}`,
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
        message: `Deleted project team (${id})`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: `Project team failed to delete (${id})`,
      });
    }
    dispatch('fetchProjectTeams');
  },
};

const mutations = {
  UPDATE_PROJECT_TEAMS: (state: any, projectTeams: any) => {
    state.projectTeams = projectTeams;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

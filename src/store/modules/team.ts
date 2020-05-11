import axios from 'axios';
import {
  sendMessage,
  newMessageId,
  httpHandleRequest,
  httpHandleResponse,
  httpHandleError,
} from '@/events/MessageService';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  teams: [],
  teamId: '',
  team: null,
};

const findTeam = (teamId: string): any => {
  if (!teamId) {
    return null;
  }
  if (state.teams?.length > 0) {
    const team = state.teams.filter((element: any) => {
      return element._id === teamId;
    });
    if (team.length === 1) {
      return team[0];
    } else {
      // console.log('Seleced team id is not present', teamId);
    }
  }
  return null;
};

const getters = {
  getTeams: (state: any) => {
    return state.teams;
  },
  getTeam: (state: any) => {
    return state.team;
  },
  findTeamById: (state: any) => (id: string) => {
    return findTeam(id);
  },
};

const actions = {
  async fetchTeams({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      `${baseUrl}/team/${rootState.profile.space}/`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_TEAMS', response.data.data);
    dispatch('chooseTeam', state.teamId);
  },
  chooseTeam({ commit, dispatch }: any, teamId: string) {
    const team = findTeam(teamId);
    commit('UPDATE_TEAM', { teamId, team });
  },
  async deleteTeam({ commit, dispatch, rootState }: any, id: string) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: `Deleting team (${id})`,
    });
    const response = await axios.delete(
      `${baseUrl}/team/${rootState.profile.space}/${id}`,
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
        message: `Team (${id}) deleted`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: `Team (${id}) failed to delete`,
      });
    }
    commit('REMOVE_TEAM', response.data.data);
    dispatch('fetchTeams');
  },
  async saveTeam({ commit, dispatch, rootState }: any, payload: any) {
    const action = 'Save Team';
    const messageId = newMessageId();
    httpHandleRequest(messageId, action, payload.name.substring(0, 10));
    try {
      const response = await axios.put(
        `${baseUrl}/team/${rootState.profile.space}/`,
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
        payload.name.substring(0, 10)
      );
      if (outcome) {
        dispatch('fetchTeams');
      }
      return outcome;
    } catch (error) {
      return httpHandleError(
        messageId,
        error,
        action,
        payload.name.substring(0, 10)
      );
    }
  },
};

const mutations = {
  UPDATE_TEAMS: (state: any, teams: any) => {
    state.teams = teams;
  },
  UPDATE_TEAM: (state: any, selectedTeamData: any) => {
    state.team = selectedTeamData.team;
    state.teamId = selectedTeamData.teamId;
  },
  REMOVE_TEAM: (state: any) => {
    state.team = null;
    state.teamId = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

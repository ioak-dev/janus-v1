import axios from 'axios';
import { sendMessage, newMessageId } from '@/events/MessageService';

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
      console.log('Seleced team id is not present', teamId);
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
  findTeamByIdList: (state: any) => (idList: any) => {
    const teamList: any = [];
    idList?.forEach((id: string) => teamList.push(...findTeam(id)?.members));
    return teamList;
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
  async saveTeam({ commit, dispatch, rootState }: any, payload: any) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: payload._id
        ? `Updating team (${payload.name})`
        : `Creating team (${payload.name})`,
    });
    const response = await axios.put(
      `${baseUrl}/team/${rootState.profile.space}/`,
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
          ? `Team (${payload.name}) updated`
          : `Team (${payload.name}) created`,
        duration: 3000,
      });
    } else {
      sendMessage('notification', true, {
        id: messageId,
        type: 'failure',
        message: payload._id
          ? `Team (${payload.name}) failed to update`
          : `Team (${payload.name}) failed to create`,
      });
    }
    // commit('UPDATE_PROJECTS', response.data.data);
    dispatch('fetchTasks');
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};

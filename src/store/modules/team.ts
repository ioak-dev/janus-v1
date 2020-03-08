import axios from 'axios';

const state = {
  teams: [],
};

const getters = {
  getTeams: (state: any) => {
    return state.projects;
  },
};

const actions = {
  async fetchTeams({ commit }: { commit: any }) {
    const data: any = [];
    data.push({
      id: 1,
      name: 'Team blue',
      members: [1, 2],
    });
    data.push({
      id: 2,
      name: 'Team green',
      members: [1, 2],
    });
    commit('UPDATE_TEAMS', data);
  },
};

const mutations = {
  UPDATE_TEAMS: (state: any, teams: any) => {
    state.teams = teams;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

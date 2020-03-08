import axios from 'axios';

const state = {
  projects: [],
};

const getters = {
  getProjects: (state: any) => {
    return state.projects;
  },
};

const actions = {
  async fetchProjects({ commit }: { commit: any }) {
    const data: any = [];
    data.push({
      id: 1,
      name: 'Janus',
      type: 'Kanban',
      teamId: 1,
      administrators: [1, 2],
      nextSequence: 1,
    });
    data.push({
      id: 1,
      name: 'Shadow',
      type: 'Kanban',
      teamId: 1,
      administrators: [1, 2],
      nextSequence: 1,
    });
    data.push({
      id: 1,
      name: 'Project#N',
      type: 'Kanban',
      teamId: 2,
      administrators: [1, 2],
      nextSequence: 1,
    });
    commit('UPDATE_PROJECTS', data);
  },
};

const mutations = {
  UPDATE_PROJECTS: (state: any, projects: any) => {
    state.projects = projects;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

const state = {
  theme: '',
  space: '',
  auth: {},
  sidebar: false,
};

const getters = {
  getProfile: (state: any) => {
    return state;
  },
};

const actions = {
  setTheme({ commit }: any, theme: any) {
    commit('UPDATE_PROFILE', { ...state, theme });
  },
  setSpace({ commit }: any, space: any) {
    commit('UPDATE_PROFILE', { ...state, space });
  },
  addAuth({ commit, dispatch }: any, { auth, cookies }: any) {
    cookies?.set(`janus_${state.space}`, {
      isAuth: true,
      token: auth.token,
      secret: auth.secret,
      name: auth.name,
      email: auth.email,
    });
    commit('UPDATE_PROFILE', { ...state, auth: auth });
    dispatch('fetchProjects');
    dispatch('fetchTeams');
  },
  removeAuth({ commit }: any, cookies: any) {
    cookies.remove(`janus_${state.space}`);
    commit('UPDATE_PROFILE', { ...state, auth: {} });
  },
  toggleSidebar({ commit }: any) {
    commit('UPDATE_PROFILE', { ...state, sidebar: !state.sidebar });
  },
};

const mutations = {
  UPDATE_PROFILE: (state: any, profile: any) => {
    state.theme = profile.theme;
    state.space = profile.space;
    state.auth = profile.auth;
    state.sidebar = profile.sidebar;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

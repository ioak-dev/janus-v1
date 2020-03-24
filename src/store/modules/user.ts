import axios from 'axios';

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
      console.log('Seleced user id is not present');
    }
  }
  return null;
};

const actions = {
  async fetchUsers({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      `http://localhost:8000/user/${rootState.profile.space}/all`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_USERS', response.data.data);
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

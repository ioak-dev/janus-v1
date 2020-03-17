import Vue from 'vue';
import Vuex from 'vuex';
import profile from '../store/modules/profile';
import task from '../store/modules/task';
import project from '../store/modules/project';
import team from '../store/modules/team';
import stage from '../store/modules/stage';
import user from '../store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { profile, task, project, team, stage, user },
});

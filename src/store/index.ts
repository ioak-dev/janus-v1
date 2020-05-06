import Vue from 'vue';
import Vuex from 'vuex';
import profile from '../store/modules/profile';
import task from '../store/modules/task';
import project from '../store/modules/project';
import projectTeam from '../store/modules/projectTeam';
import teamMember from '../store/modules/teamMember';
import team from '../store/modules/team';
import stage from '../store/modules/stage';
import user from '../store/modules/user';
import image from '../store/modules/image';
import taskComment from '../store/modules/taskComment';
import log from '../store/modules/log';
import role from '../store/modules/role';
import taskChecklistitem from '../store/modules/taskChecklistitem';
import taskAttachment from '../store/modules/taskAttachment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    profile,
    task,
    project,
    team,
    role,
    projectTeam,
    teamMember,
    stage,
    user,
    image,
    taskComment,
    log,
    taskChecklistitem,
    taskAttachment,
  },
});

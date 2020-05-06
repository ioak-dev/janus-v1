import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home/Home.vue';
import Landing from '@/components/Landing/Landing.vue';
import TeamProjects from '@/components/Team/TeamProjects.vue';
import TeamMembers from '@/components/Team/TeamMembers.vue';
import TaskView from '@/components/Project/Task/TaskView.vue';
import ProjectDashboard from '@/components/Project/Dashboard/ProjectDashboard.vue';
import ProjectAdministration from '@/components/Project/Administration/ProjectAdministration.vue';
import TeamAdministrators from '@/components/TeamAdministrators/TeamAdministrators.vue';
import Login from '@/components/Auth/Login.vue';
import Unauthorized from '@/components/Unauthorized/Unauthorized.vue';
import TeamChangeBackground from '@/components/Team/Background/TeamChangeBackground.vue';

import {
  middlewarePipeline,
  authenticate,
  readSpace,
  readProject,
  readTeam,
  readTask,
  projectAdministrator,
  teamAdministrator,
} from './middleware';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:space/unauthorized',
    component: Unauthorized,
    name: 'Unauthorized',
    meta: { middleware: [readSpace, authenticate] },
  },
  {
    path: '/:space/home',
    component: Home,
    name: 'SpaceHome',
    meta: { middleware: [readSpace, authenticate] },
  },
  {
    path: '/:space',
    component: Home,
    name: 'SpaceHomeDefault',
    meta: { middleware: [readSpace, authenticate] },
  },
  {
    path: '/oa/login',
    component: Login,
    name: 'Login',
  },
  {
    path: '/:space/:projectId/dashboard',
    component: ProjectDashboard,
    name: 'ProjectDashboard',
    meta: {
      context: 'Project',
      middleware: [readSpace, readProject, authenticate],
    },
  },
  {
    path: '/:space/:projectId/administration',
    component: ProjectAdministration,
    name: 'ProjectAdministration',
    meta: {
      context: 'Project',
      middleware: [readSpace, readProject, authenticate, projectAdministrator],
    },
  },
  {
    path: '/:space/:projectId/task/:taskId',
    component: TaskView,
    name: 'TaskView',
    meta: {
      context: 'Project',
      middleware: [readSpace, readProject, readTask, authenticate],
    },
  },
  {
    path: '/:space/:teamId/team/members',
    component: TeamMembers,
    name: 'TeamMembers',
    meta: {
      context: 'Team',
      middleware: [readSpace, readTeam, authenticate],
    },
  },
  {
    path: '/:space/:teamId/team/projects',
    component: TeamProjects,
    name: 'TeamProjects',
    meta: {
      context: 'Team',
      middleware: [readSpace, readTeam, authenticate],
    },
  },
  {
    path: '/:space/:teamId/team/administrators',
    component: TeamAdministrators,
    name: 'TeamAdministrators',
    meta: {
      context: 'Team',
      middleware: [readSpace, readTeam, authenticate, teamAdministrator],
    },
  },
  {
    path: '/:space/:teamId/team/changebackground',
    component: TeamChangeBackground,
    name: 'TeamChangeBackground',
    meta: {
      context: 'Team',
      middleware: [readSpace, readTeam, authenticate, teamAdministrator],
    },
  },
  {
    path: '',
    component: Landing,
    name: 'Landing',
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
    nextVue: context.next,
  });
});

export default router;

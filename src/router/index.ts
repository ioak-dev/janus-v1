import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home/Home.vue';
import Landing from '@/components/Landing/Landing.vue';
import TeamProjects from '@/components/Team/TeamProjects.vue';
import TeamMembers from '@/components/Team/TeamMembers.vue';
import TaskView from '@/components/Project/Task/TaskView.vue';
import MainView from '@/components/Project/Main/MainView.vue';
import TeamView from '@/components/Project/Team/TeamView.vue';
import Login from '@/components/Auth/Login.vue';
import ProjectChangeBackground from '@/components/Project/Background/ProjectChangeBackground.vue';
import TeamChangeBackground from '@/components/Team/Background/TeamChangeBackground.vue';

import {
  middlewarePipeline,
  authenticate,
  readSpace,
  readProject,
  readTeam,
  readTask,
} from './middleware';

Vue.use(VueRouter);

const routes = [
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
    path: '/:space/:projectId/main',
    component: MainView,
    name: 'MainView',
    meta: {
      context: 'Project',
      middleware: [readSpace, readProject, authenticate],
    },
  },
  {
    path: '/:space/:projectId/team',
    component: TeamView,
    name: 'TeamView',
    meta: {
      context: 'Project',
      middleware: [readSpace, readProject, authenticate],
    },
  },
  {
    path: '/:space/:projectId/changebackground',
    component: ProjectChangeBackground,
    name: 'ProjectChangeBackground',
    meta: {
      context: 'Project',
      middleware: [readSpace, readProject, authenticate],
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
    path: '/:space/:teamId/team/changebackground',
    component: TeamChangeBackground,
    name: 'TeamChangeBackground',
    meta: {
      context: 'Team',
      middleware: [readSpace, readTeam, authenticate],
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

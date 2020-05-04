import store from '@/store/index';
import { getCookie, redirectToLogin } from './library';
import axios from 'axios';

export function middlewarePipeline(context: any, middleware: any, index: any) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);
    nextMiddleware({ ...context, next: nextPipeline, nextVue: context.next });
  };
}

export function authenticate({ to, from, next, nextVue }: any) {
  if (store.getters.getProfile.auth.isAuth) {
    next();
  } else {
    const fromCookies = getCookie(`janus_${to.params.space}`);
    if (fromCookies) {
      axios
        .get(
          `${process.env.VUE_APP_ROOT_API}/auth/${to.params.space}/session/${fromCookies}`
        )
        .then(sessionResponse => {
          store.dispatch('addAuth', {
            auth: { ...sessionResponse.data.data, isAuth: true },
          });
          next();
        })
        .catch(error => {
          if (error.response.status === 401 || error.response.status === 404) {
            redirectToLogin(to.params.space);
          }
        });
    } else {
      redirectToLogin(to.params.space);
    }
  }
}

export function readSpace({ to, from, next, nextVue }: any) {
  store.dispatch('setSpace', to.params.space);
  next();
}

export function readProject({ to, from, next, nextVue }: any) {
  store.dispatch('chooseProject', to.params.projectId);
  store.dispatch('chooseTeam', null);
  next();
}

export function readTask({ to, from, next, nextVue }: any) {
  store.dispatch('addTaskToView', to.params.taskId);
  next();
}

export function readTeam({ to, from, next, nextVue }: any) {
  store.dispatch('chooseTeam', to.params.teamId);
  store.dispatch('chooseProject', null);
  next();
}

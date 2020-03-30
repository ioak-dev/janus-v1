import store from '@/store/index';

export function middlewarePipeline(context: any, middleware: any, index: any) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    nextMiddleware({ ...context, next: nextPipeline });
  };
}

export function readSpace({ to, from, next }: any) {
  if (!to.params.space) {
    console.log('space not selected error page');
  }
  store.dispatch('setSpace', to.params.space);
  next();
}

export function readProject({ to, from, next }: any) {
  if (!to.params.projectId) {
    console.log('project not selected error page');
  }
  store.dispatch('chooseProject', to.params.projectId);
  store.dispatch('chooseTeam', null);
  next();
}

export function readTask({ to, from, next }: any) {
  if (!to.params.taskId) {
    console.log('task not selected error page');
  }
  store.dispatch('addTaskToView', to.params.taskId);
  next();
}

export function readTeam({ to, from, next }: any) {
  if (!to.params.teamId) {
    console.log('team not selected error page');
  }
  store.dispatch('chooseTeam', to.params.teamId);
  store.dispatch('chooseProject', null);
  next();
}

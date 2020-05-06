import axios from 'axios';
import {
  newMessageId,
  httpHandleRequest,
  httpHandleResponse,
  httpHandleError,
} from '@/events/MessageService';

const state = {
  projects: [],
  projectId: '',
  project: null,
};

const baseUrl = process.env.VUE_APP_ROOT_API;

const findProject = (projectId: string) => {
  if (state.projects?.length > 0) {
    const project = state.projects.filter((element: any) => {
      return element._id === projectId;
    });
    if (project.length === 1) {
      return project[0];
    } else {
      // console.log('Seleced project id is not present');
    }
  }
  return null;
};

const getters = {
  getProjects: (state: any) => {
    return state.projects;
  },
  getProject: (state: any) => {
    return state.project;
  },
  getProjectById: (state: any) => (id: string) => {
    return findProject(id);
  },
};

const actions = {
  async fetchProjects({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      `${baseUrl}/project/${rootState.profile.space}`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_PROJECTS', response.data.data);
    dispatch('chooseProject', state.projectId);
  },
  chooseProject({ commit, dispatch }: any, projectId: string) {
    const project = findProject(projectId);
    commit('UPDATE_PROJECT', { projectId, project });
    if (project != null) {
      dispatch('fetchStages');
      dispatch('fetchTasks');
    }
  },
  async saveProject({ commit, dispatch, rootState }: any, payload: any) {
    const action = 'Save Project';
    const messageId = newMessageId();
    httpHandleRequest(messageId, action, payload.name.substring(0, 10));
    try {
      const response = await axios.put(
        `${baseUrl}/project/${rootState.profile.space}/`,
        payload,
        {
          headers: {
            Authorization: `${rootState.profile.auth.token}`,
          },
        }
      );
      const outcome = httpHandleResponse(
        messageId,
        response,
        action,
        payload.name.substring(0, 10)
      );
      if (outcome) {
        dispatch('fetchProjects');
      }
      return outcome;
    } catch (error) {
      return httpHandleError(
        messageId,
        error,
        action,
        payload.name.substring(0, 10)
      );
    }
  },
};

const mutations = {
  UPDATE_PROJECTS: (state: any, projects: any) => {
    state.projects = projects;
  },
  UPDATE_PROJECT: (state: any, selectedProjectData: any) => {
    state.project = selectedProjectData.project;
    state.projectId = selectedProjectData.projectId;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

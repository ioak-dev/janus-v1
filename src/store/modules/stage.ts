import axios from 'axios';
import { newMessageId, sendMessage } from '@/events/MessageService';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  stages: [],
};

const getters = {
  getStagesByProjectId: (state: any, rootState: any) => (projectId: string) => {
    let projectIdToSearch = projectId;
    if (!projectIdToSearch) {
      projectIdToSearch = rootState.getProject?._id;
    }
    if (projectIdToSearch) {
      return state.stages.filter(
        (item: any) => item.projectId === projectIdToSearch
      );
    }
    return [];
  },
};

const actions = {
  async fetchStages({ commit, dispatch, rootState }: any) {
    const response = await axios.get(
      `${baseUrl}/stage/${rootState.profile.space}`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_STAGES', response.data.data);
  },
  async saveStage({ commit, dispatch, rootState }: any, payload: any) {
    const response = await axios.put(
      `${baseUrl}/stage/${rootState.profile.space}/`,
      payload,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    dispatch('fetchStages');
    // commit('UPDATE_PROJECTS', response.data.data);
  },
  async moveStage({ commit, dispatch, rootState }: any, payload: any) {
    const moveStage: any = state.stages.find(
      (item: any) => item._id === payload.moveStageId
    );
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: `Moving stage (${moveStage?.stageId}})`,
    });
    try {
      const response = await axios.post(
        `${baseUrl}/stage/${rootState.profile.space}/${rootState.project.project._id}/move`,
        payload,
        {
          headers: {
            Authorization: `${rootState.profile.auth.token}`,
          },
        }
      );
      if (response.status === 200) {
        sendMessage('notification', true, {
          id: messageId,
          type: 'success',
          message: `Stage (${moveStage?.stageId}) moved`,
          duration: 3000,
        });
      } else {
        sendMessage('notification', true, {
          id: messageId,
          type: 'failure',
          message: `Stage (${moveStage?.stageId}}) failed to move`,
        });
      }
      // commit('UPDATE_PROJECTS', response.data.data);
      dispatch('fetchStages');
    } catch (error) {
      sendMessage('notification', true, {
        id: messageId,
        type: 'error',
        message: `Stage (${moveStage?.stageId}) failed to move`,
      });
    }
  },
};

const mutations = {
  UPDATE_STAGES: (state: any, stages: any) => {
    state.stages = stages;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

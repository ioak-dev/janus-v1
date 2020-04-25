import axios from 'axios';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  attachments: [],
};

const getters = {
  getAttachmentsForTask: (state: any, rootState: any) => {
    return state.attachments;
  },
};

const actions = {
  async fetchTaskAttachments(
    { commit, dispatch, rootState }: any,
    taskId: any
  ) {
    const response = await axios.get(
      `${baseUrl}/attachment/task/${rootState.profile.space}/task/${taskId}`,
      {
        headers: {
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    commit('UPDATE_TASK_ATTACHMENTS', response.data.data);
  },
  async saveTaskAttachment(
    { commit, dispatch, rootState }: any,
    { attachment, taskId }: any
  ) {
    const formData = new FormData();
    formData.append('attachment', attachment, attachment.name);
    formData.append('taskId', taskId);
    const response = await axios.post(
      `${baseUrl}/attachment/task/${rootState.profile.space}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    dispatch('fetchTaskAttachments', taskId);
  },
  async deleteTaskAttachment(
    { commit, dispatch, rootState }: any,
    { taskId, attachmentId }: any
  ) {
    const response = await axios.delete(
      `${baseUrl}/attachment/task/${rootState.profile.space}/${attachmentId}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${rootState.profile.auth.token}`,
        },
      }
    );
    dispatch('fetchTaskAttachments', taskId);
  },
};

const mutations = {
  UPDATE_TASK_ATTACHMENTS: (state: any, attachments: any) => {
    state.attachments = attachments;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

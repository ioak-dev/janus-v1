import axios from 'axios';

const state = {
  tasks: [],
};

const getters = {
  getTasks: (state: any) => {
    return state.tasks;
  },
};

const actions = {
  async fetchTasks({ commit }: { commit: any }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts?_limit=50'
    );
    commit('UPDATE_TASKS', response.data);
    // const data = [];
    // data.push({
    //   id: '1',
    //   projectId: '1',
    //   stageId: '1',
    //   type: 'Kanban',
    //   name: 'Test task 1 lorem ipsum',
    //   title: 'Test task 1 lorem ipsum',
    //   description: 'Test task 1 lorem ipsum with a long description',
    //   priority: 'Low',
    //   assignedTo: '1',
    //   parentTaskId: '',
    // });
    // data.push({
    //   id: '2',
    //   projectId: '1',
    //   stageId: '1',
    //   type: 'Kanban',
    //   name: 'Test task 1 lorem ipsum',
    //   title: 'Test task 1 lorem ipsum',
    //   description: 'Test task 1 lorem ipsum with a long description',
    //   priority: 'Low',
    //   assignedTo: '1',
    //   parentTaskId: '',
    // });
    // commit('UPDATE_TASKS', data);
  },
};

const mutations = {
  UPDATE_TASKS: (state: any, tasks: any) => {
    state.tasks = tasks;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

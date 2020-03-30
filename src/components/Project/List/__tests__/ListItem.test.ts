import { shallowMount, createLocalVue } from '@vue/test-utils';
import ListItem from '@/components/Project/List/ListItem.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

const task = {
  _id: 1,
  projectId: 1,
  stageId: 1,
  type: 'Epic',
  title: 'test title',
  description: 'test description',
  priority: null,
  assignedTo: 1,
  parentTaskId: null,
};

describe('ListItem.vue', () => {
  let getters;
  let actions;
  let store: any;

  beforeEach(() => {
    getters = {
      getTeam: () => {
        return {
          name: 'test team',
        };
      },
      getUserById: (state: any) => (id: string) => {
        return {
          _id: id,
          name: 'John Doe',
          email: 'test@test.com',
        };
      },
    };
    actions = {
      removeAuth: () => jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
  });
  it('renders when initialized', () => {
    const wrapper = shallowMount(ListItem, {
      store,
      localVue,
      propsData: {
        task,
      },
    });
    expect(wrapper.contains('.list-item')).toBeTruthy();
    expect(wrapper.find('.task-title').text()).toEqual('test title');
  });
});

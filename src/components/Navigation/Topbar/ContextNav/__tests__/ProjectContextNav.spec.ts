import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ProjectContextNav from '@/components/Navigation/Topbar/ContextNav/ProjectContextNav.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

const $route = {
  path: '/some/path',
  meta: {
    context: 'Project',
  },
};

describe('ProjectContextNav.vue', () => {
  let getters;
  let actions;
  let store: any;

  beforeEach(() => {
    getters = {
      getProfile: () => {
        return {
          space: 'teststace',
          auth: {
            isAuth: true,
          },
        };
      },
      getProject: () => {
        return {
          _id: 1,
        };
      },
      getTaskToView: () => {
        return null;
      },
      getRolesByProjectId: (state: any) => (id: string) => {
        return [
          {
            _id: 1,
            type: 'ProjectAdministrator',
            userId: '2',
            domainId: '1',
          },
        ];
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
    const wrapper = shallowMount(ProjectContextNav, {
      store,
      localVue,
      router,
    });
    expect(wrapper.contains('.nav-menu')).toBeTruthy();
  });
});

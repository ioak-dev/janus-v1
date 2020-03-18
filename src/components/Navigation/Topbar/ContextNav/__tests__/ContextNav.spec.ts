import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ContextNav from '@/components/Navigation/Topbar/ContextNav/ContextNav.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
const router = new VueRouter();

const $route = {
  path: '/some/path',
  meta: {
    context: 'Project',
  },
};

describe('ContextNav.vue', () => {
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
      getProject: jest.fn(),
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
    const wrapper = shallowMount(ContextNav, {
      store,
      localVue,
      router,
      mocks: {
        $route,
      },
    });
    expect(wrapper.contains('.context-nav')).toBeTruthy();
  });
});

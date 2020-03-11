import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Topbar from '@/components/Navigation/Topbar/Topbar.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Topbar.vue', () => {
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
    const wrapper = shallowMount(Topbar, {
      store,
      localVue,
    });
    expect(wrapper.contains('.topbar')).toBeTruthy();
  });
});

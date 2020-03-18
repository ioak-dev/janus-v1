import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import CommonNav from '@/components/Navigation/Sidebar/CommonNav.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe('CommonNav.vue', () => {
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
    const wrapper = shallowMount(CommonNav, { store, localVue });
    expect(wrapper.contains('.navigation')).toBeTruthy();
  });
});

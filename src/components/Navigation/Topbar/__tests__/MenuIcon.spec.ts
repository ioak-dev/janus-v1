import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MenuIcon from '@/components/Navigation/Topbar/MenuIcon.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MenuIcon.vue', () => {
  let getters;
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
    store = new Vuex.Store({
      getters,
    });
  });

  it('renders when initialized', () => {
    const wrapper = shallowMount(MenuIcon, {
      store,
      localVue,
    });
    expect(wrapper.contains('.menu-icon')).toBeTruthy();
  });

  it('emits click event, when menu icon is clicked', () => {
    const wrapper = shallowMount(MenuIcon, {
      store,
      localVue,
    });

    const toggleMenuWrapper = wrapper.find("[data-test='toggle-sidebar']");
    expect(toggleMenuWrapper).toBeTruthy();
    toggleMenuWrapper.trigger('click');
    expect(wrapper.emitted().click.length).toEqual(1);
    toggleMenuWrapper.trigger('click');
    expect(wrapper.emitted().click.length).toEqual(2);
  });
});

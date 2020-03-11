import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ProjectNav from '@/components/Navigation/Sidebar/ProjectNav.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe('ProjectNav.vue', () => {
  let getters;
  let store: any;

  beforeEach(() => {
    getters = {
      getProfile: () => {
        return {
          space: 'teststace',
        };
      },
      getProjects: () => {
        return [
          {
            _id: 1,
          },
          {
            _id: 2,
          },
        ];
      },
      getProject: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
    });
  });

  it('renders when initialized', () => {
    const wrapper = shallowMount(ProjectNav, { store, localVue, router });
    expect(wrapper.contains('.navigation')).toBeTruthy();
  });

  it('renders all projects as links', () => {
    const wrapper = shallowMount(ProjectNav, { store, localVue, router });
    expect(wrapper.findAll('.project-container').length).toEqual(2);
  });
});

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import TitleRow from '@/components/Navigation/Topbar/TitleRow.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TitleRow.vue', () => {
  let getters;
  let store: any;

  it('render project name when project stays selected', () => {
    getters = {
      getProject: () => {
        return {
          name: 'testname',
        };
      },
      getTeam: () => {
        return {
          name: 'testname',
        };
      },
    };
    store = new Vuex.Store({
      getters,
    });
    const wrapper = shallowMount(TitleRow, {
      store,
      localVue,
    });
    expect(wrapper.contains('.title-row')).toBeTruthy();
    expect(wrapper.find('.title-row').text()).toEqual('testname');
  });
});

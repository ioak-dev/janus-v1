import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Avatar from '@/components/Avatar/Avatar.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Avatar.vue', () => {
  it('renders when initialized', () => {
    const wrapper = shallowMount(Avatar, {
      propsData: {
        initials: 'Ar',
      },
    });

    expect(wrapper.contains('.avatar')).toBeTruthy();
    expect(wrapper.find('.avatar').text()).toEqual('Ar');
  });
});

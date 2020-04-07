import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Avatar from '@/components/Avatar/Avatar.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Avatar.vue', () => {
  it('renders when initialized', () => {
    const wrapper = shallowMount(Avatar, {
      propsData: {
        user: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    });
    expect(wrapper.contains('.avatar')).toBeTruthy();
    expect(wrapper.find('.avatar').text()).toEqual('JD');
  });

  it('should not show avatar when user is not passed', () => {
    const wrapper = shallowMount(Avatar, {
      propsData: {},
    });
    expect(wrapper.contains('.avatar')).toBeFalsy();
  });
});

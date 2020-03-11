import { shallowMount } from '@vue/test-utils';
import Sidebar from '@/components/Navigation/Sidebar/Sidebar.vue';

describe('Sidebar.vue', () => {
  it('renders when initialized', () => {
    const wrapper = shallowMount(Sidebar);
    expect(wrapper.contains('.sidebar')).toBeTruthy();
  });
});

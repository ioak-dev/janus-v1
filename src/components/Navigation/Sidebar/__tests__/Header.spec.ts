import { shallowMount } from '@vue/test-utils';
import Header from '@/components/Navigation/Sidebar/Header.vue';

describe('Header.vue', () => {
  it('renders when initialized', () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.contains('.header')).toBeTruthy();
  });
  it('emits sidebarToggled event, when clicked on menu icon', () => {
    const wrapper = shallowMount(Header);
    const toggleMenuWrapper = wrapper.find("[data-test='toggle-sidebar']");
    expect(toggleMenuWrapper).toBeTruthy();
    toggleMenuWrapper.trigger('click');
    expect(wrapper.emitted().sidebarToggled.length).toEqual(1);
    toggleMenuWrapper.trigger('click');
    expect(wrapper.emitted().sidebarToggled.length).toEqual(2);
  });
});

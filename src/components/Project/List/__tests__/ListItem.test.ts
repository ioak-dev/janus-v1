import { shallowMount } from '@vue/test-utils';
import ListItem from '@/components/Project/List/ListItem.vue';

const task = {
  _id: 1,
  projectId: 1,
  stageId: 1,
  type: 'Epic',
  title: 'test title',
  description: 'test description',
  priority: null,
  assignedTo: 1,
  parentTaskId: null,
};

describe('ListItem.vue', () => {
  it('renders when initialized', () => {
    const wrapper = shallowMount(ListItem, {
      propsData: {
        task,
      },
    });
    expect(wrapper.contains('.list-item')).toBeTruthy();
    expect(wrapper.find('.task-title').text()).toEqual('test title');
  });
});

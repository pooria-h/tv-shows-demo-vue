import { shallowMount } from '@vue/test-utils';
import Box from '@/components/shared/Box.vue';

describe('Box', () => {
  it('Should have margin 35px', () => {
    const wrapper = shallowMount(Box, {
      propsData: {
        margin: '35px',
      },
    });
    expect(wrapper.find('.box').attributes().style).toBe('margin: 35px;');
  });

  it('Should have margin 0', () => {
    const wrapper = shallowMount(Box);
    expect(wrapper.find('.box').attributes().style).toBe('margin: 0px;');
  });

  it('Should have no padding class', () => {
    const wrapper = shallowMount(Box, {
      propsData: {
        noPadding: true,
      },
    });
    expect(wrapper.find('.box').classes()).toContain('box--noPadding');
  });
});

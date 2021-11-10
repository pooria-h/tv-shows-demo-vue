import { shallowMount } from '@vue/test-utils';
import SkeletonLoader from '@/components/shared/SkeletonLoader.vue';

describe('SkeletonLoader', () => {
  it('Should have its default width and height', () => {
    const wrapper = shallowMount(SkeletonLoader);
    expect(wrapper.find('.skeletonLoader').attributes().style).toBe('width: 100%; height: 50px;');
  });

  it('Should have height 10px and width 34px', () => {
    const wrapper = shallowMount(SkeletonLoader, {
      propsData: {
        height: '10px',
        width: '34px',
      },
    });
    expect(wrapper.find('.skeletonLoader').attributes().style).toBe('width: 34px; height: 10px;');
  });
});

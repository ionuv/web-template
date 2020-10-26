import { mount } from '@vue/test-utils'

import './main'
import ZvPopup from '@/components/zv-popup/index.vue'

describe('test component popup', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ZvPopup, {
      slots: {
        default: '<div id="popup-slot">popup測試</div>'
      }
    })
  })

  it('默认插槽设置测试', () => {
    expect(
      wrapper
        .find('div')
        .find('#popup-slot')
        .exists()
    ).toBeTruthy()
    expect(
      wrapper
        .find('div')
        .find('#popup-slot')
        .text()
    ).toBe('popup測試')
  })

  it('属性value控制popup是否显示', () => {
    // console.log(wrapper.find('div').element.style)
    wrapper.setProps({
      value: false
    })
    expect(
      wrapper.find('div').isVisible() // 一个祖先元素拥有 display: none 或 visibility: hidden 样式则返回 false,用于断言一个组件是否被 v-show 所隐藏
    ).toBeFalsy()
    wrapper.setProps({
      value: true
    })
    expect(wrapper.find('div').isVisible()).toBeTruthy()
  })

  it('设置position定位popup位置', () => {
    wrapper.setProps({
      position: 'top'
    })
    expect(wrapper.find('div').classes()).toContain('van-popup--top')
  })

  it('设置currentValue时触发了input事件', () => {
    wrapper.setData({
      currentValue: true
    })
    expect(wrapper.emitted('input'))
    expect(wrapper.emitted('input')[0]).toEqual([true])
  })

  afterEach(() => {
    wrapper.destroy()
  })
})

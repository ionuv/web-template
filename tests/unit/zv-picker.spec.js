import { mount } from '@vue/test-utils'

import './main'
import ZvPicker from '@/components/zv-picker/index.vue'
// import ZvPopup from '@/components/zv-popup/index.vue'

// Vue.component('zv-popup', ZvPopup)

describe('测试zv-picker组件', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ZvPicker)
  })

  it('设置title属性能够成功设置picker标题', () => {
    wrapper.setProps({
      title: '测试标题'
    })
    expect(wrapper.find('.van-ellipsis.van-picker__title').text()).toBe(
      '测试标题'
    )
  })

  it('设置columns属性能够成功设置picker待选项', () => {
    const columns = ['杭州', '上海', '成都']
    wrapper.setProps({
      columns: columns
    })
    const items = wrapper.findAll('.van-picker-column__item')
    expect(items.length).toBe(columns.length)
    expect(items.at(0).text()).toBe(columns[0])
  })

  it('取消按钮能触发handleCancel事件', () => {
    const cancelBtn = wrapper.find('.van-picker__cancel')
    cancelBtn.trigger('click')
    expect(wrapper.emitted('handleCancel'))
  })

  it('确认按钮能触发handleConfirm事件并抛出选择的值', () => {
    const columns = ['杭州', '上海', '成都']
    wrapper.setProps({
      columns: columns,
      value: true
    })
    const confirmBtn = wrapper.find('.van-picker__confirm')
    const selected = wrapper.find('.van-picker-column__item--selected')
    const value = selected.text()
    const index = columns.indexOf(value)
    confirmBtn.trigger('click')
    expect(wrapper.emitted('handleConfirm', { value, index }))
  })

  afterEach(() => {
    wrapper.destroy()
  })
})

export default {
  test: () => {
    let arr = []
    for (let i = 0; i < 20; i++) {
      const text = `${i}`
      arr.push(text)
    }
    return arr
  },
  error: () => {
    return { error: true }
  }
}

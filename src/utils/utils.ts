
export function makeBoxObserver(el: HTMLElement, callback: () => void) {
  const observer = new ResizeObserver(() => {
    callback()
  })

  observer.observe(el)
}

export function throttle<T>(fn: (arg: T) => void, time: number) {
  let lastTime = 0
  return (arg: T) => {
    const now = Date.now()
    if (now - lastTime < time) {
      return
    }

    lastTime = now
    fn(arg)
  }
}

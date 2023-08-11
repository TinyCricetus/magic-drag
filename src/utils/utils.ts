
export function makeBoxObserver(el: HTMLElement, callback: () => void) {
  const observer = new ResizeObserver(() => {
    callback()
  })

  observer.observe(el)
}

export function useRequestAnimationFrame(callback: (timestamp: number) => void) {
  let animationFrameId = -1

  const cancel = () => {
    window.cancelAnimationFrame(animationFrameId)
  }

  const start = () => {
    cancel()
    animationFrameId = window.requestAnimationFrame((time) => {
      callback(time)
    })
  }

  return [start, cancel] as const
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
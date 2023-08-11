export interface ElementProps {
  id: string
  className: string
  style: Record<string, string | number>
  
  [key: `on${string}`]: (event: Event) => void
}

export function createElement(tagName: string, props: Partial<ElementProps>) {
  const {
    id,
    className,
    style,
  } = props
  const element = document.createElement(tagName)

  element.id = id || ''
  element.className = className || ''

  Object.assign(element.style, style)

  // get all event-like properties
  const eventNames = Object.keys(props).filter(key => key.startsWith('on'))
  // register event listener
  eventNames.forEach(eventName => {
    const event = eventName.substring(2)
    const callback = props[`on${event}`]
    if (callback) {
      element.addEventListener(event, ev => {
        callback(ev)
      })
    }
  })

  return element
}
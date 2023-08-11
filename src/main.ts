import { Position, convertScreenToClient } from "./core"
import { createElement } from "./core/dom"
import './main.css'
import { makeBoxObserver, throttle } from "./utils"

interface ChannelEvent {
  visible: boolean
  screenPos?: Position
}

export const CHANNEL_NAME = 'cricetus'

export const channel = new BroadcastChannel(CHANNEL_NAME)

export function listenChange(callback: (ev: MessageEvent<ChannelEvent>) => void) {
  channel.addEventListener('message', (ev) => {
    callback(ev)
  })
}

export function postChange(data: ChannelEvent) {
  channel.postMessage(data)
}

function makeDraggable(element: HTMLElement) {
  let draggable = false
  let box = element.getBoundingClientRect()

  makeBoxObserver(element, () => {
    box = element.getBoundingClientRect()
  })

  element.addEventListener('mousedown', () => {
    draggable = true
  })

  window.addEventListener('mouseup', () => {
    draggable = false
  })

  const updatePositionByScreenThrottle = throttle((pos: Position) => {
    const clientPos = convertScreenToClient(pos)
    const { x, y } = clientPos
    element.style.left = (x - Math.floor(box.width / 2)) + 'px'
    element.style.top = (y - Math.floor(box.height / 2)) + 'px'
  }, 10)

  window.addEventListener('mousemove', ev => {
    if (!draggable) {
      return
    }

    const { screenX, screenY } = ev
    const newScreenPosition: Position = { x: screenX, y: screenY }

    postChange({
      visible: true,
      screenPos: newScreenPosition
    })

    updatePositionByScreenThrottle(newScreenPosition)
  })

  listenChange((ev) => {
    element.style.visibility = ev.data.visible ? 'visible' : 'hidden'
    if (ev.data.screenPos) {
      updatePositionByScreenThrottle(ev.data.screenPos)
    }
  })

  postChange({ visible: false })
}

function run() {
  const normalDiv = createElement('div', {
    className: 'normal-block'
  })

  makeDraggable(normalDiv)
  document.body.appendChild(normalDiv)
}

run()
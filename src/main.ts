import { createElement } from "./dom"
import './main.css'

function run() {
  const block = createElement('div', {
    className: 'normal-block',
    onClick: (e) => {
      const ev = e as MouseEvent
      console.log(ev)
    }
  })

  document.body.appendChild(block)
}

run()
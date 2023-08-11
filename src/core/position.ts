export interface Position {
  x: number
  y: number
}

const OFFSET_Y = 110 // px
const OFFSET_X = 0 // px

export function convertScreenToClient(screenPos: Position): Position {
  const { screenLeft, screenTop } = window

  // 近似值，由于浏览器顶部控制栏部分无法计算出来，所以做近似处理，利用外部固定偏移进行得出
  // 但是这种计算是不准确的，需要后续修复，暂时没想法
  const approximateClientX = screenPos.x - screenLeft - OFFSET_X
  const approximateClientY = screenPos.y - screenTop - OFFSET_Y

  return {
    x: approximateClientX,
    y: approximateClientY
  }
}
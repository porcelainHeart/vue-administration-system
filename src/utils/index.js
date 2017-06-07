import Vue from 'vue'

export function convertToBlob (dataURI) {
  // mime类型
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  // base64 解码
  var byteString = atob(dataURI.split(',')[1])
  // 创建缓冲数组
  var arrayBuffer = new ArrayBuffer(byteString.length)
  // 创建视图
  var intArray = new Uint8Array(arrayBuffer)
  for (var i = 0; i < byteString.length; i += 1) {
    intArray[i] = byteString.charCodeAt(i)
  }
  // 转成blob
  return new Blob([intArray], { type: mimeString })
}

export function isType (type, obj) {
  type = `${type.toUpperCase()[0]}${type.toLowerCase().slice(1)}`
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}

export const globalElementApi = {
  $notify: config => Vue.prototype.$notify.call(null, config)
}

export function trim (str) {
  if (typeof str === 'string') return str.trim()
  return str
}

export function countDown ({
  since = new Date().getTime(),
  endTime,
  duration = 60,
  delay = 1000,
  onUpdate = () => {},
  onEnd = () => {}
}) {
  endTime = endTime || since + duration * 1000
  const interval = setInterval(update, delay)

  function update () {
    const nowTime = new Date().getTime()
    const restTime = endTime - nowTime
    if (endTime < nowTime) {
      clearInterval(interval)
      onEnd && onEnd(nowTime)
    } else {
      onUpdate && onUpdate(restTime, nowTime)
    }
  }

  return () => {
    clearInterval(interval)
  }
}

export function lowCountDown (updateFn, endFn, countTime) {
  let count = 0
  const interval = setInterval(() => {
    count++
    if (count >= countTime) {
      endFn(count)
      clearInterval(interval)
    }
    updateFn(count)
  }, 1000)
}

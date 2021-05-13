const toHex = (obj) => {
  return `0x${obj.toString(16)}`
}

const getBufferFromHex = hex => {
  hex = sanitizeHex(hex)
  const _hex = hex.toLowerCase().replace('0x', '')
  return Buffer.alloc(_hex, 'hex')
}
const padLeftEven = hex => {
  hex = hex.length % 2 !== 0 ? '0' + hex : hex
  return hex
}
const sanitizeHex = hex => {
  hex = hex.substring(0, 2) === '0x' ? hex.substring(2) : hex
  if (hex === '') return ''
  return '0x' + padLeftEven(hex)
}

export {
  toHex,
  getBufferFromHex,
  sanitizeHex
}

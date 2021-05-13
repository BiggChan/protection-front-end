const isZero = (hexNumberString) => {
  return /^0x0*$/.test(hexNumberString)
}

export {
  isZero
}

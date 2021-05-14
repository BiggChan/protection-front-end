export default async ({ payload, eventHub }, res, next) => {
  if (payload.method !== 'eth_sign') return next()
}

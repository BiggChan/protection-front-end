import { keccak256, pack } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'

export const sortsBefore = (tokenAddress0, tokenAddress1) => {
  return tokenAddress0.toLowerCase() < tokenAddress1.toLowerCase()
}

export const computePairAddress = (address0, address1) => {
  const [_address0, _address1] = sortsBefore(address0, address1) ? [address0, address1] : [address1, address0]
  return getCreate2Address(
    '0x38c03f26620edf64fc0b7c8d92d1e9dd7a18e525',
    keccak256(['bytes'], [pack(['address', 'address'], [{ address: _address0 }, { address: _address1 }])]),
    '0x273329b5d0214ea98d559b8d4d7694dcf5e94f595de9882e66381564f5265a74'
  )
}

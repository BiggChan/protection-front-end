import React from 'react'
import { useSelector } from 'react-redux'
import Layout from './Layout'

const Swap = () => {
  const test = useSelector(state => state)
  return (
    <Layout>{JSON.stringify(test)}</Layout>
  )
}

export default Swap

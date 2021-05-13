import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BancorLiquidityPool from './components/core/BancorLiquidityPool'
import Swap from './components/core/Swap'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Swap} exact />
        <Route path="/shop" component={BancorLiquidityPool} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BancorLiquidityPool from './pages/BancorLiquidityPool/index'
import Swap from './pages/Swap/index'

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

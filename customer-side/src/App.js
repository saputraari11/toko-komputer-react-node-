import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from './pages/login'
import Product from './pages/product'
import Cart from './pages/cart'
import Transaction from './pages/transaction'

export default class App extends React.Component{
  
  render(){
    return(
      <Switch>
      <Route exact path='/' component={Product}/>
      <Route path='/login' component={Login}/>
      <Route path='/Cart' component={Cart}/>
      <Route path='/transaction' component={Transaction}/>
     </Switch>
    )
  }
}

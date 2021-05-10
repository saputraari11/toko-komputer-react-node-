import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Product from './pages/product'
import Customer from './pages/customer'
import Transaksi from './pages/transaction'
import Admin from './pages/admin'

export default class App extends React.Component{
  
  render(){
    return(
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/product' component={Product}/>
      <Route path='/customer' component={Customer}/>
      <Route path='/transaksi' component={Transaksi}/>
      <Route path='/admin' component={Admin}/>
     </Switch>
    )
  }
}

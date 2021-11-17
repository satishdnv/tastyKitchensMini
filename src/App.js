import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import RestaurantDetailsRoute from './components/RestaurantDetails'
import ProtectedRoute from './components/ProtectedRoute'
import CartRoute from './components/CartRoute'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={HomeRoute} />
        <ProtectedRoute
          exact
          path="/restaurant/:id"
          component={RestaurantDetailsRoute}
        />
        <ProtectedRoute exact path="/cart" component={CartRoute} />
      </Switch>
    )
  }
}

export default App

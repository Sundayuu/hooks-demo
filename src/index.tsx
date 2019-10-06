import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { routeWithSubRoutes, history, noop } from 'utils'
import { homeRoutes } from './router'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import NotFound from './components/notFound'
import Main from './App'
import 'normalize.css/normalize.css'
import 'style/index.less'
import 'style/rem'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          {routeWithSubRoutes(homeRoutes, noop)}
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()

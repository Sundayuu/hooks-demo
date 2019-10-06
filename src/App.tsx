import React from 'react'

import { routeWithSubRoutes } from 'utils'
import { routes } from './router'
export default class Main extends React.Component<any, any> {
  _menu: any

  constructor(props) {
    super(props)
    this.state = {
      // 当前浏览器地址匹配的路由path
      matchedPath: ''
    }
  }

  handlePathMatched = path => {
    this.setState({
      matchedPath: path
    })
  }

  componentDidUpdate() {
    // 加一层判断，避免报错影响子组件渲染
    if (document.getElementById('page-content')) {
      document.getElementById('page-content').scrollTop = 0
    }
  }

  render() {
    return <div>{routeWithSubRoutes(routes, this.handlePathMatched)}</div>
  }
}

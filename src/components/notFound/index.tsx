import React, { Component } from 'react';
import { history } from 'utils';

export default class NotFound extends Component<any, any> {
  goBack = () => {
    history.push('/home');
  };
  render() {
    return (
      <div className="notFound" onClick={() => this.goBack()}>
        <img src={require('assets/img/404.png')} alt="404" />
        <div className="noText">啊哦,页面不见了</div>
        <div className="goHome">去首页</div>
      </div>
    );
  }
}

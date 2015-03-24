import React from 'react';

export default class Footer extends React.Component {

  render(){
    return (
      <footer>
        <small>Say hello <a href="http://twitter.com/farelyapp" target="_blank">@farelyapp</a>.</small>
        <small><a href="http://cash.me/$ianmcnally" target="_blank">Tip us.</a></small>
      </footer>
    );
  }

}
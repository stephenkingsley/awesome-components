import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './src/App';
import AutoComplete from './src/components/AutoComplete';
import Page from './src/components/Page';
import Button from './src/components/Button';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="autoComplete" component={AutoComplete} />
      <Route path="page" component={Page} />
      <Route path="button" component={Button} />
    </Route>
  </Router>,
  document.getElementById('root'));

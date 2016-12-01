import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './src/App';
import AutoComplete from './src/components/AutoComplete';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="autoComplete" component={AutoComplete} />
    </Route>
  </Router>,
  document.getElementById('root'));

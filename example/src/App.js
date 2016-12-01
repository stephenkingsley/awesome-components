import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './app.css';
import { componentsList } from './data/leftBarData';

const App = (props) => (
  <div>
    <div className="left_bar">
      <div className="left_bar_title">Awesome-components</div>
      <div>
        <div className="left_bar_list">Document</div>
        <div className="left_bar_list">Components</div>
        {
          componentsList.map((ele, index) => (
            <div
              key={index}
              className="left_bar_list_children"
            >
              <Link to={ele.route}>{ele.name}</Link>
            </div>
          ))
        }
      </div>
    </div>
    <div className="children">{props.children}</div>
  </div>
);

App.propTypes = {
  children: PropTypes.shape({}),
};

export default App;

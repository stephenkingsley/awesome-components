import React, { PropTypes } from 'react';
import MarkDown from 'react-markdown';

const TemplateRightBar = (props) => (
  <div className="component-right">
    <div className="component-top-bar">
      AutoComplete
    </div>
    <div className="component-pane">
      <div className="component-pane-title">
        👇 simple example👇
      </div>
      <div className="component-pane-example">
        { props.children }
      </div>
    </div>
    <div className="component-pane-example-markdown">
      <MarkDown source={props.md} />
    </div>
  </div>
);

TemplateRightBar.propTypes = {
  md: PropTypes.string,
  children: PropTypes.shape({}),
};

export default TemplateRightBar;

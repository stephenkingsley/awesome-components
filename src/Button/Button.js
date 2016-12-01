import React, { Component, PropTypes } from 'react';
import clone from 'lodash/clone';

const defaultButtonStyle = {
  minWidth: '200px',
  width: '200px',
  height: '40px',
  lineHeight: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '4px',
  padding: '4px',
  cursor: 'pointer',
};
const solidStyle = {
  background: '#00bcd4',
  color: '#FFF',
};
const hollowStyle = {
  border: '2px solid #00bcd4',
  background: '#FFF',
  color: '#00bcd4',
};
const spanStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};


export default class Button extends Component {
  static propTypes = {
    string: PropTypes.string,
    style: PropTypes.shape({}),
    // spanStyle: PropTypes.shape({}),
    type: PropTypes.string,
  };

  static defaultProps = {
    string: 'Awesome Button',
    type: 'solid',
  };

  constructor(props) {
    super(props);
    let buttonStyle = {};
    if (props.type === 'hollow') {
      buttonStyle = Object.assign(defaultButtonStyle, hollowStyle, props.style);
    } else {
      buttonStyle = Object.assign(defaultButtonStyle, solidStyle, props.style);
    }
    this.state = {
      buttonStyle,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let buttonStyle;
    if (nextProps.type === 'hollow') {
      buttonStyle = Object.assign(defaultButtonStyle, hollowStyle, nextProps.style);
    } else {
      buttonStyle = Object.assign(defaultButtonStyle, solidStyle, nextProps.style);
    }
    this.setState({
      buttonStyle,
    });
  }

  mouseOver() {
    const { type } = this.props;
    const { buttonStyle } = this.state;
    const newStyle = clone(buttonStyle);
    if (type === 'hollow') {
      newStyle.background = '#E0E0E0';
    } else {
      newStyle.background = '#06d7f1';
    }
    this.setState({
      buttonStyle: newStyle,
    });
  }

  mouseLeave() {
    const { type } = this.props;
    const { buttonStyle } = this.state;
    const newStyle = clone(buttonStyle);
    if (type === 'hollow') {
      newStyle.background = '#FFF';
    } else {
      newStyle.background = '#00bcd4';
    }
    this.setState({
      buttonStyle: newStyle,
    });
  }

  render() {
    const { string } = this.props;
    const { buttonStyle } = this.state;
    return (
      <div
        {...this.props}
        style={buttonStyle}
        onMouseOver={event => this.mouseOver(event)}
        onMouseLeave={event => this.mouseLeave(event)}
      >
        <span
          style={spanStyle}
        >
          {string}
        </span>
      </div>
    );
  }
}

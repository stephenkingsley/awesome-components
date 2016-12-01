import React, { Component, PropTypes } from 'react';
import clone from 'lodash/clone';

const style = {
  height: '30px',
  lineHeight: '30px',
  padding: '4px',
  cursor: 'pointer',
  color: '#455A64',
};

export default class Rows extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    parentLength: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    const newStyle = clone(style);
    if (props.parentLength !== props.index + 1) {
      newStyle.borderBottom = '1px solid #E0E0E0';
    } else {
      newStyle.borderBottom = '0px solid #E0E0E0';
    }

    this.state = {
      overRows: false,
      rowsStyle: newStyle,
    };

    this.rowsOverMouseOver = this.rowsOverMouseOver.bind(this);
    this.rowsLeaveMouseOver = this.rowsLeaveMouseOver.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const newStyle = clone(style);
    if (nextProps.parentLength !== nextProps.index + 1) {
      newStyle.borderBottom = '1px solid #E0E0E0';
    } else {
      newStyle.borderBottom = '0px solid #E0E0E0';
    }

    this.state = {
      rowsStyle: newStyle,
    };
  }

  rowsOverMouseOver() {
    const { rowsStyle } = this.state;
    const newStyle = clone(rowsStyle);
    this.setState({
      overRows: true,
      rowsStyle: Object.assign(newStyle, { background: '#E0E0E0' }),
    });
  }

  rowsLeaveMouseOver() {
    const { rowsStyle } = this.state;
    const newStyle = clone(rowsStyle);
    this.setState({
      overRows: false,
      rowsStyle: Object.assign(newStyle, { background: '#FFF' }),
    });
  }

  selectItem() {
    const { value, onChange } = this.props;
    onChange(value);
  }

  render() {
    const { index, value } = this.props;
    const { rowsStyle } = this.state;
    return (
      <div
        key={index}
        style={rowsStyle}
        onMouseOver={() => this.rowsOverMouseOver()}
        onMouseLeave={() => this.rowsLeaveMouseOver()}
      >
        <a
          style={{
            display: 'flex',
            width: '100%',
            outline: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          tabIndex={index}
          onClick={() => this.selectItem()}
        >
          {value}
        </a>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import clone from 'lodash/clone';
import fetchJsonp from 'fetch-jsonp';
import Rows from './Rows';

export default class AutoComplete extends Component {
  static propTypes = {
    containerStyle: PropTypes.shape({}),
    inputStyle: PropTypes.shape({}),
    selectStyle: PropTypes.shape({}),
    placeholder: PropTypes.string,
    // onConfirme: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    containerStyle: {},
    inputStyle: {},
    selectStyle: {},
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      defaultContainerStyle: Object.assign({
        boxSizing: 'border-box',
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        minHeight: '50px',
        height: '50px',
        width: '312px',
      }, props.containerStyle),
      defaultInputStyle: Object.assign({
        border: '0px',
        borderRadius: '4px',
        minHeight: '40px',
        height: '40px',
        width: '300px',
        outline: 'none',
        padding: '4px',
        color: '#455A64',
        fontSize: '14px',
      }, props.inputStyle),
      defaultSelectStyle: Object.assign({
        position: 'absolute',
        zIndex: 10,
        marginTop: '1px',
        width: '312px',
        background: '#FFF',
        borderRadius: '4px',
        border: '1px solid #E0E0E0',
        boxSizing: 'border-box',
      }, props.selectStyle),
      autocomplete: [],
      defaultPlaceholder: props.placeholder || 'input some word',
      banBlur: false,
    };
    this.element = {};
    this.input = this.input.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
    this.mouseOverSelectList = this.mouseOverSelectList.bind(this);
    this.mouseLeaveSelectList = this.mouseLeaveSelectList.bind(this);
    this.selectItem = this.selectItem.bind(this);
    // this.onConfirme = this.onConfirme.bind(this);
    this.keydownInput = this.keydownInput.bind(this);
  }

  input(event) {
    const { onChange } = this.props;
    if (event.target.value) {
      const url = `http://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${event.target.value}`;
      fetchJsonp(url, {
        timeout: 3000,
      })
      .then(response => response.json())
      .then((json, error) => {
        if (!error) {
          this.setState({
            autocomplete: json[1],
          });
        } else {
          this.setState({
            autocomplete: [],
          });
        }
      });
    } else {
      this.setState({
        autocomplete: [],
      });
    }

    this.setState({
      value: event.target.value,
    });

    onChange && onChange(event.target.value);
  }

  focusInput() {
    const { defaultInputStyle } = this.state;
    const newDefaultInputStyle = clone(defaultInputStyle);
    // newDefaultInputStyle.outline = '1px solid #E0E0E0';
    this.setState({
      defaultInputStyle: newDefaultInputStyle,
    });
  }

  blurInput() {
    const { onBlur } = this.props;
    const { defaultInputStyle, banBlur, autocomplete } = this.state;
    const newDefaultInputStyle = clone(defaultInputStyle);
    // newDefaultInputStyle.outline = 'none';

    let newAutocomplete;
    if (banBlur) {
      newAutocomplete = clone(autocomplete);
    } else {
      newAutocomplete = [];
    }

    this.setState({
      defaultInputStyle: newDefaultInputStyle,
      autocomplete: newAutocomplete,
    });

    if (onBlur) {
      onBlur();
    }
  }

  mouseOverSelectList() {
    this.setState({
      banBlur: true,
    });
  }

  mouseLeaveSelectList() {
    this.setState({
      banBlur: false,
    });
  }

  selectItem(value) {
    const { onChange } = this.props;
    this.setState({
      value,
      autocomplete: [],
    });
    onChange && onChange(value);
  }

  keydownInput(event) {
    if (event.keyCode === 13) {
      const { onChange } = this.props;
      const { value } = this.state;
      onChange && onChange(value);
    }
  }

  saveComponentsValue(element) {
    if (element) {
      const { value } = this.state;
      element.dataset.value = value;
      this.element = element;
    }
  }

  renderInput() {
    const { defaultInputStyle, defaultPlaceholder, value } = this.state;
    return (
      <input
        type="text"
        placeholder={defaultPlaceholder}
        style={defaultInputStyle}
        value={value}
        onChange={(event) => this.input(event)}
        onFocus={() => this.focusInput()}
        onBlur={() => this.blurInput()}
        onKeyDown={(event) => this.keydownInput(event)}
      />
    );
  }

  renderSelect() {
    const { defaultSelectStyle, autocomplete } = this.state;
    let element;
    if (autocomplete.length > 0) {
      element = (
        <div
          style={defaultSelectStyle}
          onMouseOver={() => this.mouseOverSelectList()}
          onMouseLeave={() => this.mouseLeaveSelectList()}
        >
          {
            autocomplete.map((ele, index) => (
              <Rows
                key={index}
                index={index}
                value={ele}
                parentLength={autocomplete.length}
                onChange={(value) => this.selectItem(value)}
              />
            ))
          }
        </div>
      );
    } else {
      element = '';
    }
    return element;
  }

  render() {
    const { defaultContainerStyle } = this.state;
    return (
      <div
        ref={(element) => this.saveComponentsValue(element)}
        style={defaultContainerStyle}
      >
        {this.renderInput()}
        {this.renderSelect()}
      </div>
    );
  }
}

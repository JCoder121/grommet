function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import styled from 'styled-components';
import { defaultProps } from '../../default-props';
import { ThemeContext } from '../../contexts';
import { FocusedContainer } from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
import { backgroundIsDark } from '../../utils';
import { StyledLayer, StyledContainer, StyledOverlay } from './StyledLayer';
var HiddenAnchor = styled.a.withConfig({
  displayName: "LayerContainer__HiddenAnchor",
  componentId: "sc-1srj14c-0"
})(["width:0;height:0;overflow:hidden;position:absolute;"]);

var LayerContainer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(LayerContainer, _Component);

  function LayerContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "anchorRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "containerRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "layerRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "makeLayerVisible", function () {
      var node = _this.layerRef.current || _this.containerRef.current;

      if (node && node.scrollIntoView) {
        node.scrollIntoView();
      }
    });

    return _this;
  }

  var _proto = LayerContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        position = _this$props.position,
        modal = _this$props.modal;

    if (position !== 'hidden') {
      this.makeLayerVisible(); // Once layer is open we make sure it has focus so that you
      // can start tabbing inside the layer. If the caller put focus
      // on an element already, we honor that. Otherwise, we put
      // the focus in the hidden anchor.

      var element = document.activeElement;

      while (element) {
        if (element === this.containerRef.current) {
          // already have focus inside the container
          break;
        }

        element = element.parentElement;
      }

      if (modal && !element && this.anchorRef.current) {
        this.anchorRef.current.focus();
      }
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var position = this.props.position;

    if (prevProps.position !== position && position !== 'hidden') {
      this.makeLayerVisible();
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        id = _this$props2.id,
        modal = _this$props2.modal,
        onClickOutside = _this$props2.onClickOutside,
        onEsc = _this$props2.onEsc,
        plain = _this$props2.plain,
        position = _this$props2.position,
        responsive = _this$props2.responsive,
        propsTheme = _this$props2.theme,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["children", "id", "modal", "onClickOutside", "onEsc", "plain", "position", "responsive", "theme"]);

    var theme = this.context || propsTheme;
    var content = React.createElement(StyledContainer, _extends({
      id: id
    }, rest, {
      position: position,
      plain: plain,
      responsive: responsive,
      ref: this.containerRef
    }), React.createElement(HiddenAnchor, {
      ref: this.anchorRef,
      tabIndex: "-1",
      "aria-hidden": "true"
    }), children);

    if (modal) {
      content = React.createElement(StyledLayer, {
        id: id,
        plain: plain,
        position: position,
        responsive: responsive,
        tabIndex: "-1",
        ref: this.layerRef
      }, React.createElement(StyledOverlay, {
        plain: plain,
        onMouseDown: onClickOutside,
        responsive: responsive
      }), content);
      /* eslint-enable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
    }

    if (onEsc) {
      content = React.createElement(Keyboard, {
        onEsc: onEsc
      }, content);
    }

    if (theme.layer.background) {
      var dark = backgroundIsDark(theme.layer.background, theme);

      if (dark !== undefined && dark !== theme.dark) {
        content = React.createElement(ThemeContext.Provider, {
          value: _extends({}, theme, {
            dark: dark
          })
        }, content);
      }
    }

    if (modal) {
      content = React.createElement(FocusedContainer, {
        hidden: position === 'hidden',
        restrictScroll: true
      }, content);
    }

    return content;
  };

  return LayerContainer;
}(Component);

_defineProperty(LayerContainer, "contextType", ThemeContext);

_defineProperty(LayerContainer, "defaultProps", {
  full: false,
  margin: 'none',
  modal: true,
  position: 'center'
});

Object.setPrototypeOf(LayerContainer.defaultProps, defaultProps);
export { LayerContainer };
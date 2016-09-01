import React, { Component, PropTypes } from 'react';
import styles from './styles.styl';
import cssmodules from 'react-css-modules';

// const styles = require('./styles.styl');

@cssmodules(styles)
export default class Noname extends Component {

  render() {
    return (
      <div styleName="myclass"></div>
    )
  }
}

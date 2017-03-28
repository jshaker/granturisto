/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles.css';

injectTapEventPlugin();
render(
  <App/>,
  document.getElementById('app')
);

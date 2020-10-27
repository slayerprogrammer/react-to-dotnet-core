import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';


import './custom.css'
import { Trips } from './components/Trip/Trips';
import {Create} from './components/Trip/Create';
import { Update } from './components/Trip/Update';
import { Delete } from './components/Trip/Delete';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/create' component = {Create} />
        <Route path='/trips' component = {Trips} />
        <Route path='/update/:id' component = {Update} />
        <Route path='/delete/:id' component = {Delete} />
      </Layout>
    );
  }
}

import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Layout from './layouts/default';
import Stats from './component/stats';
import Status from './component/status';
import Config from './component/config';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/'>
            <Stats />
          </Route>
          <Route path='/status'>
            <Status />
          </Route>
          <Route path='/config'>
            <Config />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

import React, {Component, Suspense, lazy} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
// Prime React related
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import WaitSpinner from './components/WaitSpinner/WaitSpinner';
import Home from './Home/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    if (process.env.NODE_ENV === 'development') {
      const whyDidYouRender = require('@welldone-software/why-did-you-render');
      whyDidYouRender(React, {
        trackAllPureComponents: true,
      });
    }
  }

  render() {
    const Devices = lazy(() => import('./device/Devices/Devices'));
    const DeviceDetails = lazy(() => import('./device/DeviceDetails/DeviceDetails'));
    const Users = lazy(() => import('./user/Users/Users'));
    const UserDetails = lazy(() => import('./user/UserDetails/UserDetails'));
    const NotFound = lazy(() => import('./components/NotFound/NotFound'));

    return (
      <div>
        <HashRouter basename="/">
          <Suspense fallback={<WaitSpinner />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/devices" render={props => <Devices></Devices>} />
              <Route
                path="/devices/:id"
                render={props => <DeviceDetails itemId={props.match.params.id} itemData={null} showClose={false} />}
              />
              <Route exact path="/users" render={props => <Users></Users>} />
              <Route
                path="/users/:id"
                render={props => <UserDetails itemId={props.match.params.id} itemData={null} showClose={false} />}
              />
              {/* when none of the above match */}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </HashRouter>
      </div>
    );
  }
}

export default App;

import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
// Prime React related
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import WaitSpinner from './components/WaitSpinner/WaitSpinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    const Devices = lazy(() => import('./device/Devices/Devices'));
    const DeviceDetails = lazy(() => import('./device/DeviceDetails/DeviceDetails'));
    const NotFound = lazy(() => import('./components/NotFound'));

    return (
      <div>
        <BrowserRouter>
          <Suspense fallback={<WaitSpinner />}>
            <Switch>
              <Route exact path="/" render={props => <Redirect to={{pathname: '/devices', state: {from: '/'}}} />} />
              <Route exact path="/devices" render={props => <Devices></Devices>} />
              <Route
                path="/devices/:id"
                render={props => <DeviceDetails itemId={props.match.params.id} itemData={null} />}
              />
              {/* when none of the above match */}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

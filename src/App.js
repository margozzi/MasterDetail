import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// Prime React related 
import {ProgressSpinner} from 'primereact/progressspinner';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './App.css';

class App extends Component {   

  render() {
    const MasterDetail = lazy(() => import('./components/MasterDetail/MasterDetail'));
    const DeviceDetails = lazy(() => import('./components/DeviceDetail/DeviceDetails'));
    const NotFound = lazy(() => import('./components/NotFound'));

    return (
        <div>
          <BrowserRouter>
            <Suspense fallback={<ProgressSpinner/>}>
              <Switch>
                <Route exact path="/" render={props => <MasterDetail data={this.fakeDeviceData} />} />
                <Route exact path="/devices" render={props => <MasterDetail data={this.fakeDeviceData} />} />
                <Route path="/devices/:id" render={props => <DeviceDetails itemData={this.fakeDeviceData[props.match.params.id]} />} />
                {/* when none of the above match */}
                <Route component={NotFound} />
              </Switch>
            </Suspense>
            </BrowserRouter>
        </div>

    );
  }

  fakeDeviceData = [
    {
      id: 0,
      user: 'Mike Margozzi',
      role: 'student',
      manufacturer: 'Samsung',
      type: 'Galaxy',
      model: 'S8',
      mac: '11:22:33:44:55:66',
      name: 'Personal cell phone',
      status: 'online',
      credentials: 'certificate',
      enabled: true,
      active: true,
      added: 1564076127000,
      expires: 1588523327000,
    },
    {
      id: 1,
      user: 'Mike Margozzi',
      role: 'student',
      manufacturer: 'Apple',
      type: 'iPhone',
      model: 'X',
      mac: '22:33:44:55:66:77',
      name: 'Work cell phone',
      status: 'online',
      credentials: 'certificate',
      enabled: true,
      active: true,
      added: 1563076127000,
      expires: 1566076127000,
    },
    {
      id: 2,
      user: 'Mike Margozzi',
      role: 'student',
      manufacturer: 'Roku',
      type: 'Streaming Stick',
      model: '3800',
      mac: '33:44:55:66:77:88',
      name: 'Livingroom Roku',
      status: 'offline',
      credentials: 'MPSK',
      enabled: true,
      active: true,
      added: 1553076127000,
      expires: 1656076127000,
    },
    {
      id: 3,
      user: 'Craig Stone',
      role: 'faculty',
      manufacturer: 'Roku',
      type: 'Streaming Stick',
      model: '3800',
      mac: '44:55:66:77:88:99',
      name: 'Bedroom Roku',
      status: 'online',
      credentials: 'MPSK',
      enabled: true,
      active: true,
      added: 1053076127000,
      expires: 0,
    },
    {
      id: 4,
      user: 'Craig Stone',
      role: 'faculty',
      manufacturer: 'Apple',
      type: 'iPhone',
      model: '5',
      mac: '55:66:77:88:99:aa',
      name: 'Personal cell phone',
      status: 'online',
      credentials: 'certificate',
      enabled: true,
      active: true,
      added: 1500076127000,
      expires: 1550076127000,
    },
  ];
}

export default App;

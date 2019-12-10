import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// Prime React related
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import ColumnFormatter from './services/ColumnFormatter';
import WaitSpinner from './components/WaitSpinner/WaitSpinner';

class App extends Component {
  render() {
    const MasterDetail = lazy(() => import('./components/MasterDetail/MasterDetail'));
    const DeviceDetails = lazy(() => import('./components/DeviceDetail/DeviceDetails'));
    const NotFound = lazy(() => import('./components/NotFound'));

    return (
      <div>
        <BrowserRouter>
          <Suspense fallback={<WaitSpinner />}>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <div style={{margin: '10px'}}>
                    <MasterDetail
                      label="Devices"
                      breakpoints={this.breakpoints}
                      breakpointColumns={this.breakpointColumns}
                      columnModel={this.columnModel}
                      data={this.fakeDeviceData}
                      useOverlay={false}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/devices"
                render={props => (
                  <div style={{margin: '10px'}}>
                    <MasterDetail
                      label="Devices"
                      breakpoints={this.breakpoints}
                      breakpointColumns={this.breakpointColumns}
                      columnModel={this.columnModel}
                      data={this.fakeDeviceData}
                    />
                  </div>
                )}
              />
              <Route
                path="/devices/:id"
                render={props => <DeviceDetails itemData={this.fakeDeviceData[props.match.params.id]} />}
              />
              {/* when none of the above match */}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>
    );
  }

  breakpoints = [600, 1000, 1500];

  breakpointColumns = [3, 7, 12];

  columnModel = [
    {field: 'user', header: 'User', width: 140},
    {field: 'mac', header: 'MAC Address', width: 140},
    {field: 'name', header: 'Name', width: 200},
    {field: 'role', header: 'Role', width: 80},
    {field: 'manufacturer', header: 'Manufacturer', width: 120},
    {field: 'type', header: 'Type', width: 130},
    {field: 'model', header: 'Model', width: 80},
    {field: 'status', header: 'Status', width: 70},
    {field: 'credentials', header: 'Credentials', width: 110},
    {field: 'enabled', header: 'Enabled', width: 80, formatter: new ColumnFormatter({field: 'enabled'}).yesNoTemplate},
    {field: 'active', header: 'Active', width: 80, formatter: new ColumnFormatter({field: 'active'}).yesNoTemplate},
    {field: 'added', header: 'Added', width: 100, formatter: new ColumnFormatter({field: 'added'}).dateShortTemplate},
    {
      field: 'expires',
      header: 'Cert Expires',
      width: 100,
      formatter: new ColumnFormatter({field: 'expires'}).dateFromNowTemplate,
    },
  ];

  fakeDeviceData = [
    {
      id: 0,
      user: 'Fred Flintstone',
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
      user: 'Fred Flintstone',
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
      user: 'Fred Flintstone',
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
      user: 'Barney Rubble',
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
      user: 'Barney Rubble',
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

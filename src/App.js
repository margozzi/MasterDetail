import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
// Prime React related
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import ColumnFormatter from './services/ColumnFormatter';
import WaitSpinner from './components/WaitSpinner/WaitSpinner';
import FakeDataService from './services/FakeDataService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  deviceDataService = new FakeDataService();

  render() {
    const MasterDetail = lazy(() => import('./components/MasterDetail/MasterDetail'));
    const DeviceDetails = lazy(() => import('./components/DeviceDetail/DeviceDetails'));
    const NotFound = lazy(() => import('./components/NotFound'));

    return (
      <div>
        <BrowserRouter>
          <Suspense fallback={<WaitSpinner />}>
            <Switch>
              <Route exact path="/" render={props => <Redirect to={{pathname: '/devices', state: {from: '/'}}} />} />
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
                      dataService={this.deviceDataService}
                    />
                  </div>
                )}
              />
              <Route
                path="/devices/:id"
                render={props => <DeviceDetails itemData={this.deviceDataService.get(props.match.params.id)} />}
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
}

export default App;

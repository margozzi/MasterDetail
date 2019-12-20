import React, {Component} from 'react';
import MasterDetail from '../../components/MasterDetail/MasterDetail';
import DeviceDetails from '../DeviceDetails/DeviceDetails';
import ColumnFormatter from '../../services/ColumnFormatter';
import FakeDataService from '../../services/FakeDataService';

class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
    this.deviceDataService = new FakeDataService();
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.setEnabledState = this.setEnabledState.bind(this);
  }

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

  render() {
    return (
      <div style={{margin: '10px'}}>
        <MasterDetail
          label="Devices"
          breakpoints={[600, 1000, 1500]}
          breakpointColumns={[3, 7, 12]}
          columnModel={this.columnModel}
          dataService={this.deviceDataService}
          menuProvider={this}
          selectionChangedCallback={this.onSelectionChanged}
          nameField="user"
          line1Field="user"
          line2Field="mac"
          line3Field="name"
        >
          <DeviceDetails></DeviceDetails>
        </MasterDetail>
      </div>
    );
  }

  buildMenu = selected => {
    let actions;
    if (selected.length > 0) {
      actions = {
        label: 'Actions',
        items: [],
      };
      if (selected.length === 1)
        actions.items.push({
          label: 'Edit',
          command: () => {},
        });

      let enabledCount = 0;
      let disabledCount = 0;
      selected.forEach(item => {
        item.enabled ? enabledCount++ : disabledCount++;
      });
      if (enabledCount > 0)
        actions.items.push({
          label: 'Disable',
          command: () => {
            this.setEnabledState(false);
          },
        });
      if (disabledCount > 0)
        actions.items.push({
          label: 'Enable',
          command: () => {
            this.setEnabledState(true);
          },
        });
    }
    return actions;
  };

  setEnabledState = state => {
    this.state.selected.forEach(item => {
      item.enabled = state;
      this.deviceDataService.update(item).then(response => {
        this.deviceDataService.reload();
      });
    });
  };

  onSelectionChanged = selected => {
    this.setState({selected: selected});
  };
}

export default Devices;

Example Master Detail:

```jsx
import DeviceDetails from '../../device/DeviceDetails/DeviceDetails';
import ColumnFormatter from '../../services/ColumnFormatter';
import FakeDataService from '../../services/FakeDataService';
import {HashRouter} from 'react-router-dom';

const fakeDataService = new FakeDataService();
const breakpoints = [600, 1000, 1500];
const breakpointColumns = [3, 7, 12];

const columnModel = [
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

<HashRouter>
  <MasterDetail
    label="Devices"
    breakpoints={breakpoints}
    breakpointColumns={breakpointColumns}
    columnModel={columnModel}
    nameField="user"
    line1Field="user"
    line2Field="mac"
    line3Field="name"
    useOverlay={false}
    detailWidth={450}
    data={fakeDataService.fakeData}
  ></MasterDetail>
</HashRouter>;
```

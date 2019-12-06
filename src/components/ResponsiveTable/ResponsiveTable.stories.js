import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import ResponsiveTable from './ResponsiveTable';
import ColumnFormatter from '../../services/ColumnFormatter';

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

const fakeDeviceData = [
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

storiesOf('ResponsiveTable', module).add('With Fake Data', () => (
  <ResponsiveTable
    breakpoints={breakpoints}
    breakpointColumns={breakpointColumns}
    columnModel={columnModel}
    data={fakeDeviceData}
    idField="id"
    line1Field="user"
    line2Field="mac"
    line3Field="name"
    rowClickCallback={action('row clicked')}
    selectionChangeCallback={action('selection changed')}
  />
));

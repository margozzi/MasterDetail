import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import ResponsiveTable from './ResponsiveTable';
import ColumnFormatter from '../../services/ColumnFormatter';
import FakeDataService from '../../services/FakeDataService';

const breakpoints = [600, 1000, 1500];
const breakpointColumns = [3, 7, 12];
const fakeDataService = new FakeDataService();

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

storiesOf('ResponsiveTable', module).add('With Fake Data', () => (
  <ResponsiveTable
    breakpoints={breakpoints}
    breakpointColumns={breakpointColumns}
    columnModel={columnModel}
    data={fakeDataService.fakeData}
    idField="id"
    nameField="user"
    line1Field="user"
    line2Field="mac"
    line3Field="name"
    rowClickCallback={action('row clicked')}
    selectionChangeCallback={action('selection changed')}
  />
));

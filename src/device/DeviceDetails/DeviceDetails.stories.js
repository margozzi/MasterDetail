import React from 'react';
import {storiesOf} from '@storybook/react';
import DeviceDetails from './DeviceDetails';
import {HashRouter} from 'react-router-dom';
import FakeDataService from './../../services/FakeDataService';

const fakeDataService = new FakeDataService();
const data = fakeDataService.fakeData;

storiesOf('DeviceDetails', module)
  .add('Online', () => (
    <HashRouter>
      <DeviceDetails itemData={data[0]}></DeviceDetails>
    </HashRouter>
  ))
  .add('Offline, MPSK', () => (
    <HashRouter>
      <DeviceDetails itemData={data[2]}></DeviceDetails>
    </HashRouter>
  ));

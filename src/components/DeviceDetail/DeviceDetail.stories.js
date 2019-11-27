import React from 'react';
import {storiesOf} from '@storybook/react';
import DeviceDetails from './DeviceDetails';
import {HashRouter} from 'react-router-dom';

var data = [
  {
    id: 1,
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
    expires: 1538523327000,
  },
  {
    id: 2,
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
    added: 0,
    expires: 0,
  },
  {
    id: 3,
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
    added: 0,
    expires: 0,
  },
  {
    id: 4,
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
    added: 0,
    expires: 0,
  },
  {
    id: 5,
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
    added: 0,
    expires: 0,
  },
];

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

import React from 'react';
import {storiesOf} from '@storybook/react';
import MasterDetail from './MasterDetail';
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
    expires: 1588523327000,
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
    added: 1563076127000,
    expires: 1566076127000,
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
    added: 1553076127000,
    expires: 1656076127000,
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
    enabled: false,
    active: false,
    added: 1053076127000,
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
    active: false,
    added: 1500076127000,
    expires: 1550076127000,
  },
];

storiesOf('MasterDetail', module).add('Inline Details', () => (
  <HashRouter>
    <MasterDetail data={data}></MasterDetail>
  </HashRouter>
));

storiesOf('MasterDetail', module).add('Overlay Details', () => (
  <HashRouter>
    <MasterDetail useOverlay={true} data={data}></MasterDetail>
  </HashRouter>
));

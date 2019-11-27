import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Summary from './Summary';

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

storiesOf('Summary', module)
  .add('One Unslected', () => (
    <Summary
      id="123456"
      itemData={data[0]}
      line1Field="user"
      line2Field="mac"
      line3Field="name"
      onSelection={action('selected My HP Laptop')}
      onShowDetails={action('show details')}
    ></Summary>
  ))
  .add('One Selected', () => (
    <Summary
      id="123456"
      itemData={data[0]}
      line1Field="user"
      line2Field="mac"
      line3Field="name"
      onSelection={action('selected My HP Laptop')}
      onShowDetails={action('show details')}
      selected={true}
    ></Summary>
  ))
  .add('Multiple', () => (
    <>
      <Summary
        idField="id"
        itemData={data[0]}
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('0')}
        onShowDetails={action('show details')}
      ></Summary>
      <Summary
        idField="id"
        itemData={data[1]}
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('1')}
        onShowDetails={action('show details')}
      ></Summary>
      <Summary
        idField="id"
        itemData={data[2]}
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('2')}
        onShowDetails={action('show details')}
      ></Summary>
      <Summary
        idField="id"
        itemData={data[3]}
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('3')}
        onShowDetails={action('show details')}
      ></Summary>
      <Summary
        idField="id"
        itemData={data[4]}
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('4')}
        onShowDetails={action('show details')}
      ></Summary>
    </>
  ));

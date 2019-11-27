import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import SelectionButton from './SelectionButton';

var data = {
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
};

storiesOf('SelectionButton', module)
  .add('One Initial', () => (
    <SelectionButton initials="M" bgColor="#FF9AA2" onClick={action('clicked One Initial')}></SelectionButton>
  ))
  .add('Two Initials', () => (
    <SelectionButton initials="MM" bgColor="#FF9AA2" onClick={action('clicked Two Initials')}></SelectionButton>
  ))
  .add('Two Initials default size', () => (
    <SelectionButton initials="MM" bgColor="#FF9AA2" onClick={action('clicked default size')}></SelectionButton>
  ))
  .add('Two Initials small', () => (
    <SelectionButton size="small" initials="MM" bgColor="#FF9AA2" onClick={action('clicked small')}></SelectionButton>
  ))
  .add('Two Initials medium', () => (
    <SelectionButton size="medium" initials="MM" bgColor="#FF9AA2" onClick={action('clicked medium')}></SelectionButton>
  ))
  .add('Two Initials large', () => (
    <SelectionButton size="large" initials="MM" bgColor="#FF9AA2" onClick={action('clicked small')}></SelectionButton>
  ))
  .add('name', () => <SelectionButton name="Mike Margozzi" onClick={action('clicked no name')}></SelectionButton>)
  .add('itemData', () => (
    <SelectionButton itemData={data} nameField="user" onClick={action('clicked itemData')}></SelectionButton>
  ));

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import SearchHeader from './SearchHeader';

const menuItems = [
  {
    label: 'Selection',
    items: [
      {
        label: 'Select All',
        command: action('Select All'),
      },
      {
        label: 'Select None',
        command: action('Select None'),
      },
    ],
  },
];

storiesOf('SearchHeader', module).add('No label', () => <SearchHeader searchCallback={action()}></SearchHeader>);
storiesOf('SearchHeader', module).add('Label', () => (
  <SearchHeader label="Things" searchCallback={action()}></SearchHeader>
));

storiesOf('SearchHeader', module).add('Hide label', () => (
  <SearchHeader label="Things" searchCallback={action()} hideLabel={true}></SearchHeader>
));

storiesOf('SearchHeader', module).add('With Menu', () => (
  <SearchHeader label="Things" searchCallback={action()} menuModel={menuItems}></SearchHeader>
));

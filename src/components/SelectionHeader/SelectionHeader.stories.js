import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import SelectionHeader from '../SelectionHeader/SelectionHeader';

let selected = [1, 2, 3, 4, 5];

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

storiesOf('SelectionHeader', module).add('No Menu', () => (
  <SelectionHeader
    selectedCount={selected.length}
    clearCallback={action('Select None')}
    deleteCallback={action('Delete selected')}
  ></SelectionHeader>
));
storiesOf('SelectionHeader', module).add('With Menu', () => (
  <SelectionHeader
    menuModel={menuItems}
    selectedCount={selected.length}
    clearCallback={action('Select None')}
    deleteCallback={action('Delete selected')}
  ></SelectionHeader>
));

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import SearchHeader from './SearchHeader';

storiesOf('SearchHeader', module).add('No label', () => <SearchHeader searchCallback={action()}></SearchHeader>);
storiesOf('SearchHeader', module).add('Label', () => (
  <SearchHeader label="Things" searchCallback={action()}></SearchHeader>
));

storiesOf('SearchHeader', module).add('Hide label', () => (
  <SearchHeader label="Things" searchCallback={action()} hideLabel={true}></SearchHeader>
));

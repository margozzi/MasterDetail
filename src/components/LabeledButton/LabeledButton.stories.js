import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import LabeledButton from './LabeledButton';

storiesOf('LabeledButton', module)
  .add('default', () => <LabeledButton></LabeledButton>)
  .add('power off', () => (
    <LabeledButton iconName="power-off" label="power off" onClick={action('clicked power')}></LabeledButton>
  ));

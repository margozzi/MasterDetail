import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Button} from 'primereact/button';
import YesNoDialog from './YesNoDialog';

let visible = false;
storiesOf('YesNoDialog', module).add('Visible', () => (
  <>
    <Button
      label="Show"
      icon="pi pi-check"
      onClick={() => {
        visible = true;
      }}
    />
    <YesNoDialog
      visible={visible}
      modal={false}
      header="Dangerous Question"
      message="Does this dress make me look fat?"
      callBack={button => {
        action('You clicked on ' + button);
      }}
    ></YesNoDialog>
  </>
));

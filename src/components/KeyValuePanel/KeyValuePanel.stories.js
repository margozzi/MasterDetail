import React from 'react';
import {storiesOf} from '@storybook/react';
import KeyValuePanel from './KeyValuePanel';

storiesOf('KeyValuePanel', module).add('fake data', () => (
  <KeyValuePanel
    labels={['Enabled', 'User', 'Name', 'Credentials', 'Added', 'Last Seen']}
    values={[
      'Yes',
      <>
        <a href="/user/31415">Michael Margozzi</a>&nbsp;&nbsp;&nbsp;(
        <a href="/roles/1">student</a>)
      </>,
      'My Personal Cell Phone',
      'certificate (expires in 234 days)',
      '20 Jun 2019',
      '20 Jun 2019 (6 days ago)',
    ]}
  ></KeyValuePanel>
));

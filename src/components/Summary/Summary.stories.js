import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Summary from './Summary';
import FakeDataService from './../../services/FakeDataService';

const fakeDataService = new FakeDataService();

storiesOf('Summary', module)
  .add('One Unslected', () => (
    <Summary
      id="123456"
      itemData={fakeDataService.fakeData[0]}
      nameField="user"
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
      itemData={fakeDataService.fakeData[0]}
      nameField="user"
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
        itemData={fakeDataService.fakeData[0]}
        nameField="user"
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('0')}
        onShowDetails={action('show details')}
      ></Summary>
      <Summary
        idField="id"
        itemData={fakeDataService.fakeData[1]}
        nameField="user"
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('1')}
        onShowDetails={action('show details')}
      ></Summary>
      <Summary
        idField="id"
        itemData={fakeDataService.fakeData[2]}
        nameField="user"
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('2')}
        onShowDetails={action('show details')}
      ></Summary>
      <Summary
        idField="id"
        itemData={fakeDataService.fakeData[3]}
        nameField="user"
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('3')}
        onShowDetails={action('show details')}
      ></Summary>
      <Summary
        idField="id"
        itemData={fakeDataService.fakeData[4]}
        nameField="user"
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        onSelection={action('4')}
        onShowDetails={action('show details')}
      ></Summary>
    </>
  ));

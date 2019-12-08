import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import ResponsiveHeader from './ResponsiveHeader';
import ResizeDetector from 'react-resize-detector';

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

storiesOf('ResponsiveHeader', module).add('No label', () => (
  <ResizeDetector
    handleWidth
    render={({width}) => {
      const mobile = width < 480;
      return (
        <ResponsiveHeader
          clearCallback={action('Clear')}
          deleteCallback={action('Delete')}
          selectedCount={5}
          searchCallback={action()}
          mobile={mobile}
        ></ResponsiveHeader>
      );
    }}
  ></ResizeDetector>
));

storiesOf('ResponsiveHeader', module).add('Label', () => (
  <ResizeDetector
    handleWidth
    render={({width}) => {
      const mobile = width < 480;
      return (
        <ResponsiveHeader
          label="Things"
          clearCallback={action('Clear')}
          deleteCallback={action('Delete')}
          selectedCount={5}
          searchCallback={action()}
          mobile={mobile}
        ></ResponsiveHeader>
      );
    }}
  ></ResizeDetector>
));

storiesOf('ResponsiveHeader', module).add('With Menu', () => (
  <ResizeDetector
    handleWidth
    render={({width}) => {
      const mobile = width < 480;
      return (
        <ResponsiveHeader
          label="Things"
          clearCallback={action('Clear')}
          deleteCallback={action('Delete')}
          selectedCount={5}
          searchCallback={action()}
          mobile={mobile}
          menuModel={menuItems}
        ></ResponsiveHeader>
      );
    }}
  ></ResizeDetector>
));

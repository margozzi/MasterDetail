```jsx
import React from 'react';
import ResponsiveHeader from './ResponsiveHeader';
import ResizeDetector from 'react-resize-detector';

const menuItems = [
  {
    label: 'Selection',
    items: [
      {
        label: 'Select All',
        command: () => alert('Select All'),
      },
      {
        label: 'Select None',
        command: () => alert('Select None'),
      },
    ],
  },
];

<ResizeDetector
  handleWidth
  render={({width}) => {
    const mobile = width < 480;
    return (
      <ResponsiveHeader
        label="Things"
        clearCallback={() => alert('Clear')}
        deleteCallback={() => alert('Delete')}
        selectedCount={5}
        searchCallback={() => alert('search')}
        mobile={mobile}
        menuModel={menuItems}
      ></ResponsiveHeader>
    );
  }}
></ResizeDetector>;
```

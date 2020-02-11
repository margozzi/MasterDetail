Example Search Header

```jsx
import SearchHeader from './SearchHeader';

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

<SearchHeader
  label="Things"
  searchCallback={() => alert('search')}
  hideLabel={true}
  menuModel={menuItems}
></SearchHeader>;
```

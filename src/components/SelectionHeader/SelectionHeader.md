Example Selection Header:

```jsx
let selected = [1, 2, 3, 4, 5];

const menuItems = [
  {
    label: 'Selection',
    items: [
      {
        label: 'Select All',
        command: () => {
          alert('Select All');
        },
      },
      {
        label: 'Select None',
        command: () => {
          alert('Select None');
        },
      },
    ],
  },
];

<SelectionHeader
  menuModel={menuItems}
  selectedCount={selected.length}
  clearCallback={() => {
    alert('Deselect All');
  }}
  deleteCallback={() => {
    alert('Delete selected');
  }}
></SelectionHeader>;
```

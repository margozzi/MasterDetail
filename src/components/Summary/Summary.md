Example Summary:

```jsx
<Summary
  itemData={{
    id: 1,
    user: 'Mike Margozzi',
    role: 'Student',
    manufacturer: 'Samsung',
    type: 'Galaxy',
    model: 'S8',
    mac: '11:22:33:44:55:66',
    name: 'Personal cell phone',
    status: 'online',
    credentials: 'certificate',
    enabled: true,
    active: true,
    added: 1564076127000,
    expires: 1538523327000,
  }}
  idField="id"
  nameField="user"
  line1Field="user"
  line2Field="name"
  line3Field="mac"
  selected={true}
  onSelection={() => {
    alert('Button clicked');
  }}
  onShowDetails={() => {
    alert('Text Clicked');
  }}
/>
```

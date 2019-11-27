Example Device Details:

```jsx
import {HashRouter} from 'react-router-dom';
<HashRouter>
  <DeviceDetails
    itemData={{
      id: 1,
      user: 'Mike Margozzi',
      role: 'student',
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
    onClose={() => {
      alert('close clicked');
    }}
  />
</HashRouter>;
```

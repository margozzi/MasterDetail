Example Yes/No Dialog:

```jsx
import {Button} from 'primereact/button';
import YesNoDialog from './YesNoDialog';

let confirmDialog;
<>
  <Button
    label="Show"
    icon="pi pi-check"
    onClick={() => {
      confirmDialog.setVisible(true);
    }}
  />
  <YesNoDialog
    ref={ref => {
      confirmDialog = ref;
    }}
    modal={false}
    header="Dangerous Question"
    message="Does this dress make me look fat?"
    callBack={button => {
      alert('You clicked on Yes');
    }}
  ></YesNoDialog>
</>;
```

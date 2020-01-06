import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';

import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      useOverlay: true,
    };
  }

  render() {
    let queryString = '?useOverlay=';
    queryString += this.state.useOverlay ? 'true' : 'false';
    return (
      <div className="p-grid p-dir-col p-align-center p-nogutter">
        <p className="p-col description">
          Master Detail display using a responsive table. The table displays more or fewer columns depending on
          available width. When the table becomes too narrow it switches to a single column with a compact display that
          roughly mimics gmail on a phone.
        </p>
        <p className="p-col description">
          The detail panel can be shown in an overlay panel or optionally in-line with the grid. When the available
          width is too small to show the detail panel, it will be navigated to instead, regardless of this setting.
        </p>
        <div>
          <Checkbox
            inputId="check"
            onChange={e => {
              this.setState({useOverlay: e.checked});
            }}
            checked={this.state.useOverlay}
          ></Checkbox>
          <label htmlFor="check" className="p-checkbox-label">
            Use Overlay for Detail Panel
          </label>
        </div>
        <Link to={'/devices' + queryString}>
          <Button label="Canned Data" style={{margin: '20px'}} className="p-button-raised p-col" />
        </Link>
        <Link to={'/users' + queryString}>
          <Button label="Network Data" className="p-button-raised p-col" />
        </Link>
      </div>
    );
  }
}

export default Home;

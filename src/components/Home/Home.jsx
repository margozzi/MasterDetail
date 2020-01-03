import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="p-grid p-dir-col p-align-center p-nogutter">
        <p className="p-col description">
          Master Detail display using a responsive table. The table displays more or less columns depending on available
          width. When the table becomes tooo narrow it switches to a single column with a compact display that roughly
          mimics gmail on a phone.
        </p>
        <Link to="/devices">
          <Button label="Canned Data" style={{margin: '20px'}} className="p-button-raised p-col" />
        </Link>
        <Link to="/users">
          <Button label="Network Data" className="p-button-raised p-col" />
        </Link>
      </div>
    );
  }
}

export default Home;

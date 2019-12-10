import React, {Component} from 'react';
// Prime React related
import {ProgressSpinner} from 'primereact/progressspinner';
import './WaitSpinner.css';

class WaitSpinner extends Component {
  render() {
    return (
      <div className="flex">
        <ProgressSpinner className="flex-center" />
      </div>
    );
  }
}

export default WaitSpinner;

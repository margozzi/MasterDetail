import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import Moment from 'react-moment';
import {withRouter} from 'react-router-dom';
import LabeledButton from '../LabeledButton/LabeledButton';
import KeyValuePanel from '../KeyValuePanel/KeyValuePanel';

class DeviceDetails extends Component {
  panelStyle = {
    backgroundColor: 'white',
    marginLeft: '20px',
  };

  onlineStyle = {
    color: 'green',
    fontSize: '18px',
    fontStyle: 'bold',
  };

  offlineStyle = {
    color: 'red',
    fontSize: '18px',
    fontStyle: 'bold',
  };

  buttonStyle = {
    marginRight: '20px',
    marginBottom: '10px',
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  buildValues = device => {
    var userUrl = '/user/' + device.userId;
    var roleUrl = '/role/' + device.roleId;
    var values = [];
    values.push(device.enabled ? 'Yes' : 'No');
    values.push(
      <>
        <a href={userUrl}>{device.user}</a> (<a href={roleUrl}>{device.role}</a>)
      </>
    );
    values.push(device.name);
    var cred = device.credentials;
    cred += cred === 'certificate' ? ' (expires in 234 days)' : '';
    values.push(cred);
    values.push(<Moment date={device.added} />);
    values.push(<Moment date={device.lastSeen} />);
    return values;
  };

  onClose = () => {
    this.props.onClose();
  };

  escFunction(event) {
    if (event.keyCode === 27) {
      this.onClose();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render() {
    const mobile = this.props.location.pathname.startsWith('/device/');
    const device = this.props.itemData;
    if (!device) {
      return null;
    }
    return (
      <div style={this.panelStyle}>
        {/* Header */}
        <div className="p-grid p-align-center p-nogutter" style={{marginBottom: '10px'}}>
          <div className="p-col-fixed" style={{fontSize: '24px', marginRight: '40px'}}>
            Device Details
          </div>
          <div className="p-col-fixed" style={device.status === 'online' ? this.onlineStyle : this.offlineStyle}>
            {device.status === 'online' ? 'Online' : 'Offline'}
          </div>
          <div className="p-col" style={{width: '100%'}} />
          {!mobile && (
            <i
              className="p-col-fixed pi pi-times"
              onClick={this.onClose}
              style={{fontSize: '28px', color: 'lightgrey', marginLeft: '40px', cursor: 'pointer'}}
            ></i>
          )}
        </div>

        {/* Properties */}
        <div style={{fontSize: '18px'}}>
          {device.manufacturer} {device.type} {device.model} ({device.mac})
        </div>
        <div style={{margin: '20px'}}>
          <KeyValuePanel
            labels={['Enabled', 'User', 'Name', 'Credentials', 'Added', 'Last Seen']}
            values={this.buildValues(device)}
          ></KeyValuePanel>
        </div>
        {/* Buttons */}
        <div className="p-grid p-align-center p-nogutter" style={{marginBottom: '10px'}}>
          <div className="p-col-fixed" style={this.buttonStyle}>
            <LabeledButton
              iconName="power-off"
              label="Disable"
              //buttonClass="p-button-secondary"
              onClick={() => {
                alert('Clicked Disable');
              }}
            />
          </div>
          <div className="p-col-fixed" style={this.buttonStyle}>
            <LabeledButton
              iconName="trash"
              label="Delete"
              //buttonClass="p-button-secondary"
              onClick={() => {
                alert('Clicked Delete');
              }}
            />
          </div>
          <div className="p-col-fixed" style={this.buttonStyle}>
            <LabeledButton
              iconName="replay"
              label="Revoke Certificate"
              //buttonClass="p-button-secondary"
              onClick={() => {
                alert('Clicked Revoke');
              }}
            />
          </div>
        </div>

        <div style={{fontSize: '18px', marginTop: '20px'}}>Recent Activity</div>
        <div style={{margin: '20px'}}>
          <KeyValuePanel
            labels={['An Hour ago', 'A day ago', '3 days ago']}
            values={[
              'Something interesting happened here',
              'Not quite as interesting, but still interesting',
              'OMG, this is really bad. Something needs to be done',
            ]}
          ></KeyValuePanel>
        </div>
      </div>
    );
  }
}

export default withRouter(DeviceDetails);

DeviceDetails.defaultProps = {
  onClose: () => {},
};

DeviceDetails.propTypes = {
  /** The background color to use when selected */
  itemData: PropTypes.object.isRequired,
  /** Function to call back when the close button is clicked */
  onClose: PropTypes.func,
};

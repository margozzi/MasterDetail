import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import KeyValuePanel from '../../components/KeyValuePanel/KeyValuePanel';
import UserService from './../../services/UserService';
import WaitSpinner from './../../components/WaitSpinner/WaitSpinner';

class UserDetails extends Component {
  panelStyle = {
    marginLeft: '20px',
  };

  constructor(props) {
    super(props);
    this.state = {
      itemData: this.props.itemData,
    };
    if (!this.props.itemData) {
      this.dataService = new UserService();
    }
    this.onClose = this.onClose.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

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
    const user = this.props.itemId != null ? this.state.itemData : this.props.itemData;
    if (!user && !this.props.itemId) {
      return null;
    }
    if (!user && this.props.itemId) {
      this.dataService.get(this.props.itemId).then(
        response => {
          this.setState({itemData: response});
        },
        reason => {
          return {reason};
        }
      );
      return <WaitSpinner></WaitSpinner>;
    }
    return (
      <div style={this.panelStyle}>
        {/* Header */}
        <div className="p-grid p-align-center p-nogutter" style={{marginBottom: '10px'}}>
          <div className="p-col-fixed" style={{fontSize: '24px', marginRight: '40px'}}>
            User Details ({user.id})
          </div>
          <div className="p-col" style={{width: '100%'}} />
          {this.props.showClose && (
            <i
              className="p-col-fixed pi pi-times"
              onClick={this.onClose}
              style={{fontSize: '28px', color: 'lightgrey', marginLeft: '40px', cursor: 'pointer'}}
            ></i>
          )}
        </div>
        {/* Properties */}
        <div style={{margin: '20px'}}>
          <KeyValuePanel
            labels={['Name', 'User Name', 'e-mail', 'Address', 'Phone Number', 'Web Site', 'Company']}
            values={this.buildValues(user)}
          ></KeyValuePanel>
        </div>
      </div>
    );
  }

  buildValues = user => {
    var values = [];
    values.push(user.name);
    values.push(user.username);
    values.push(user.email);
    values.push(
      <>
        <div>{user.address.street}</div>
        <div>{user.address.suite}</div>
        <div>{user.address.city}</div>
        <div>{user.address.zipcode}</div>
      </>
    );
    values.push(user.phone);
    values.push(<a href={user.website}>{user.website}</a>);
    values.push(
      <>
        <div>{user.company.name}</div>
        <div>{user.company.catchPhrase}</div>
        <div>{user.company.bs}</div>
      </>
    );
    return values;
  };
}

export default UserDetails;

UserDetails.propTypes = {
  /** The data object for this user */
  itemData: PropTypes.object,
  /** Id of item to be fetched. Optional way to pass in data */
  itemId: PropTypes.string,
  /** Function to call back when the close button is clicked */
  onClose: PropTypes.func,
  /** Should the close button be shown in the upper right corner */
  showClose: PropTypes.bool,
};

UserDetails.defaultProps = {
  onClose: () => {},
  showClose: true,
};

import React, {Component} from 'react';
import MasterDetail from '../../components/MasterDetail/MasterDetail';
import UserDetails from '../UserDetails/UserDetails';
import UserService from '../../services/UserService';

class Users extends Component {
  constructor(props) {
    super(props);
    this.dataService = new UserService();
  }

  columnModel = [
    {field: 'name', header: 'Name', width: 120},
    {field: 'username', header: 'User Name', width: 90},
    {field: 'email', header: 'e-mail', width: 130},
    {field: 'address.street', header: 'Street', width: 90},
    {field: 'address.suite', header: 'Suite', width: 60},
    {field: 'address.city', header: 'City', width: 80},
    {field: 'address.zipcode', header: 'Zip Code', width: 70},
    {field: 'phone', header: 'Phone', width: 120},
    {field: 'website', header: 'Web Site', width: 80},
  ];

  render() {
    return (
      <div style={{margin: '10px'}}>
        <MasterDetail
          label="Users"
          breakpoints={[600, 1000, 1500]}
          breakpointColumns={[3, 7, 10]}
          columnModel={this.columnModel}
          dataService={this.dataService}
          nameField="name"
          line1Field="name"
          line2Field="username"
          line3Field="email"
        >
          <UserDetails></UserDetails>
        </MasterDetail>
      </div>
    );
  }
}

export default Users;

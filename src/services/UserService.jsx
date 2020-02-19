import React from 'react';
import axios from 'axios';
import {PropTypes} from 'prop-types';

class UserService extends React.Component {
  config = {offest: 0, limit: 20, sort: null, filter: null};

  list = config => {
    if (config) {
      this.config = {...this.config, ...config}; // Merge
    }
    const params = config && config.filter ? {name: config.filter} : {};
    const headers = {'Access-Control-Allow-Origin': '*'};

    return axios
      .get('https://jsonplaceholder.typicode.com/users', {
        params: params,
        headers: headers,
      })
      .then(res => res.data);
  };

  get = id => {
    return axios.get('https://jsonplaceholder.typicode.com/users/' + id).then(res => res.data);
  };

  update = item => {
    return axios.put('https://jsonplaceholder.typicode.com/users/' + item.id, JSON.stringify(item)).catch(error => {
      throw error;
    });
  };

  create = item => {
    return axios.post('https://jsonplaceholder.typicode.com/users', JSON.stringify(item)).catch(error => {
      throw error;
    });
  };

  delete = items => {
    if (Array.isArray(items)) {
      let promises = [];
      for (let item of items) {
        promises.push(axios.delete('https://jsonplaceholder.typicode.com/users/' + item.id));
      }
      return axios.all(promises);
    } else {
      return axios.delete('https://jsonplaceholder.typicode.com/users/' + items.id);
    }
  };

  dataChanged = () => {
    this.props.dataChangedCallback();
  };

  setReloadCallback = callback => {
    this.reloadCallback = callback;
  };

  reload = () => {
    this.reloadCallback();
  };
}

export default UserService;

UserService.propTypes = {
  /** Data changed callback */
  dataChangedCallback: PropTypes.func,
};

UserService.defaultProps = {
  dataChangedCallback: () => {},
};

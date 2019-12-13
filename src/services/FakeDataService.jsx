import React from 'react';

class FakeDataService extends React.Component {
  list = (offset, limit, sort, filter) => {
    if (!filter || filter.length === 0) {
      return Promise.resolve(this.fakeData);
    } else {
      const newArray = this.fakeData.filter(item => {
        return item.user.includes(filter);
      });
      return Promise.resolve(newArray);
    }
  };

  get = id => {
    this.fakeData.forEach(item => {
      if (id === this.fakeData.id) {
        return Promise.resolve(item);
      }
    });
    return Promise.reject('No such Id');
  };

  update = item => {
    const index = this.fakeData.indexOf(item);
    if (index === -1) {
      return Promise.reject('No such item with id: ' + item.id);
    }
    this.fakeData[index] = item;
    return Promise.resolve(item);
  };

  create = item => {
    this.fakeData.push(item);
    return Promise.resolve(item);
  };

  delete = items => {
    if (Array.isArray(items)) {
      var clone = [...this.fakeData];
      items.forEach(value => {
        const index = clone.indexOf(value);
        if (index === -1) {
          return Promise.reject('No such item with id: ' + value.id);
        } else {
          clone.splice(index, 1);
        }
      });
      this.fakeData = clone;
    } else {
      const index = this.fakeData.indexOf(items);
      if (index === -1) {
        return Promise.reject('No such item with id: ' + items.id);
      } else {
        this.fakeData.splice(index, 1);
      }
    }
    return Promise.resolve(this.fakeData);
  };

  fakeData = [
    {
      id: 0,
      user: 'Fred Flintstone',
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
      expires: 1588523327000,
    },
    {
      id: 1,
      user: 'Fred Flintstone',
      role: 'student',
      manufacturer: 'Apple',
      type: 'iPhone',
      model: 'X',
      mac: '22:33:44:55:66:77',
      name: 'Work cell phone',
      status: 'online',
      credentials: 'certificate',
      enabled: true,
      active: true,
      added: 1563076127000,
      expires: 1566076127000,
    },
    {
      id: 2,
      user: 'Fred Flintstone',
      role: 'student',
      manufacturer: 'Roku',
      type: 'Streaming Stick',
      model: '3800',
      mac: '33:44:55:66:77:88',
      name: 'Livingroom Roku',
      status: 'offline',
      credentials: 'MPSK',
      enabled: true,
      active: true,
      added: 1553076127000,
      expires: 1656076127000,
    },
    {
      id: 3,
      user: 'Barney Rubble',
      role: 'faculty',
      manufacturer: 'Roku',
      type: 'Streaming Stick',
      model: '3800',
      mac: '44:55:66:77:88:99',
      name: 'Bedroom Roku',
      status: 'online',
      credentials: 'MPSK',
      enabled: true,
      active: true,
      added: 1053076127000,
      expires: 0,
    },
    {
      id: 4,
      user: 'Barney Rubble',
      role: 'faculty',
      manufacturer: 'Apple',
      type: 'iPhone',
      model: '5',
      mac: '55:66:77:88:99:aa',
      name: 'Personal cell phone',
      status: 'online',
      credentials: 'certificate',
      enabled: true,
      active: true,
      added: 1500076127000,
      expires: 1550076127000,
    },
  ];
}

export default FakeDataService;

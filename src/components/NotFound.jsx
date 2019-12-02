import React from 'react';
import image from '../resources/images/404ErrorFunny.jpg';

class NotFound extends React.Component {
  render() {
    return (
      <div className="p-grid p-dir-col p-align-center">
        <h1 className="p-col">404 - Not Found</h1>
        <img className="p-col" src={image} alt="404" height="290" width="535" />
      </div>
    );
  }
}

export default NotFound;

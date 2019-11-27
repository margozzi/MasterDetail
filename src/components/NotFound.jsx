import React from 'react';
import image from '../resources/images/404ErrorFunny.jpg';

class NotFound extends React.Component {

    render() {
        return (
            <div className="p-grid p-dir-col p-align-center" >
                <h1 classname="p-col">404 - Not Found</h1>
                <img classname="p-col" src={image} alt={this.props.t("404")} height="290" width="535" />
            </div>
        );
    }
}

export default NotFound;

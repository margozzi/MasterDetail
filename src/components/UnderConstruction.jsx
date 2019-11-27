import React from 'react';
import { PropTypes } from 'prop-types';
import { withTranslation } from 'react-i18next';

class UnderConstruction extends React.Component {

    render() {
      return (
        <div className='login'>
            <div>{this.props.text}</div>
            <div>{this.props.t('underConstruction')}</div>
        </div>
      );
    }
}

UnderConstruction.propTypes = {
  text: PropTypes.string
};

export default withTranslation()(UnderConstruction);
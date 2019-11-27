import Moment from 'react-moment';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import './ColumnFormatter.css';

class ColumnFormatter extends Component {
  yesNoTemplate = itemData => {
    const yes = itemData[this.props.field];
    let classes = yes ? 'green' : 'red';
    classes += ' center';
    return <div className={classes}>{itemData[this.props.field] ? 'Yes' : 'No'}</div>;
  };

  dateShortTemplate = itemData => {
    if (itemData[this.props.field] === 0) {
      return 'Never';
    }
    return <Moment date={itemData[this.props.field]} format="D MMM YYYY" />;
  };

  dateFromNowTemplate = itemData => {
    if (itemData[this.props.field] === 0) {
      return 'Never';
    }
    const future = itemData[this.props.field] > new Date().getTime();
    return (
      <Moment className={future ? 'green' : 'red'} fromNow>
        {itemData[this.props.field]}
      </Moment>
    );
  };
}

export default ColumnFormatter;

ColumnFormatter.propTypes = {
  /** The name of the column property to format */
  field: PropTypes.string,
};

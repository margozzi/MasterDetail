import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import {Button} from 'primereact/button';

class LabeledButton extends Component {
  render() {
    return (
      <>
        <div className="p-grid p-align-center p-nogutter">
          <Button
            className={'p-col-fixed' + this.props.buttonClass ? this.props.buttonClass : ''}
            icon={'pi pi-' + this.props.iconName}
            onClick={this.props.onClick}
          />
          <div className="p-col-fixed" style={{marginLeft: '5px'}}>
            {this.props.label}
          </div>
        </div>
      </>
    );
  }
}

export default LabeledButton;

LabeledButton.defaultProps = {
  iconName: 'question',
  label: 'No Label',
  onClick: () => {
    alert('Please add an onClick handle');
  },
};

LabeledButton.propTypes = {
  /** The name of the icon to display in the button. Assumes primeicons
   *  Icon library to chose from: https://www.primefaces.org/showcase/ui/misc/primeicons.xhtml
   *  You only specify the name like "question" and "pi pi-question" will be used.
   */
  iconName: PropTypes.string.isRequired,
  /** The label to be used for the button. The label will be on the right of the icon */
  label: PropTypes.string.isRequired,
  /** The callback function to be called when the button is clicked */
  onClick: PropTypes.func.isRequired,
  /**  Add the button class for background color. Optional, defaults to primary color.
   *  Other options are: .p-button-secondary .p-button-success .p-button-info .p-button-warning .p-button-danger
   */
  buttonClass: PropTypes.string,
};

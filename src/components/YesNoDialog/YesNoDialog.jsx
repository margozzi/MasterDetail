import {Button} from 'primereact/button';
import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';

class YesNoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    const footer = (
      <div>
        <Button id="yes" label="Yes" icon="pi pi-check" onClick={this.props.callBack} />
        <Button id="no" label="No" icon="pi pi-times" onClick={this.hide} className="p-button-secondary" />
      </div>
    );

    return (
      <Dialog
        header={this.props.header}
        visible={this.state.visible}
        style={{width: '80vw', maxWidth: this.props.maxWidth}}
        footer={footer}
        onHide={e => {
          this.setVisible(false);
        }}
        modal={this.props.modal}
      >
        {this.props.message}
      </Dialog>
    );
  }

  setVisible = visible => {
    this.setState({visible: visible});
  };

  hide = () => {
    this.setVisible(false);
  };
}

export default YesNoDialog;

YesNoDialog.propTypes = {
  /** The text to be displayed in the dialog header*/
  header: PropTypes.string.isRequired,
  /** The text to be displayed in the dialog body*/
  message: PropTypes.string.isRequired,
  /** The function to call back  when the dialog is dismissed by clicking on Yes or No */
  callBack: PropTypes.func.isRequired,
  /** Display the dialog or not */
  visible: PropTypes.bool.isRequired,
  /** Make the dialog modal. Defaults to true */
  modal: PropTypes.bool,
  /** Size for mobile, else desktop */
  mobile: PropTypes.bool,
  /** The widest the dialog should be allowed to grow. */
  maxWidth: PropTypes.string,
};

YesNoDialog.defaultProps = {
  modal: true,
  visible: false,
  maxWidth: '600px',
};

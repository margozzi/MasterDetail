import {Button} from 'primereact/button';
import {Menu} from 'primereact/menu';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class SelectionHeader extends Component {
  render() {
    return (
      <div className="p-grid p-align-center p-nogutter" style={{marginBottom: '10px'}}>
        <Button className="p-col-fixed" icon="pi pi-chevron-left" onClick={this.props.clearCallback} />
        <div className="p-col-fixed" style={{fontSize: '18px', marginLeft: '20px'}}>
          {this.props.selectedCount}
        </div>
        <div className="p-col" style={{width: '100%'}}>
          &nbsp;
        </div>
        <Button className="p-col-fixed" icon="pi pi-trash" onClick={this.props.deleteCallback} />
        {this.props.menuModel && (
          <>
            <Menu model={this.props.menuModel} popup={true} ref={el => (this.menu = el)} />
            <Button
              className="p-col-fixed"
              icon="pi pi-bars"
              style={{marginLeft: '27px'}}
              onClick={event => this.menu.toggle(event)}
            />
          </>
        )}
      </div>
    );
  }
}

export default SelectionHeader;

SelectionHeader.propTypes = {
  clearCallback: PropTypes.func.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
  menuModel: PropTypes.array,
};

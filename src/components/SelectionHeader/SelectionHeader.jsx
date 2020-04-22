import {Button} from 'primereact/button';
import {Menu} from 'primereact/menu';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

class SelectionHeader extends PureComponent {
  headerStyle = {marginBottom: '10px'};
  selectedCountStyle = {fontSize: '18px', marginLeft: '20px'};
  fullWidthStyle = {width: '100%'};
  menuStyle = {marginLeft: '20px'};

  render() {
    return (
      <div className="p-grid p-align-center p-nogutter" style={this.headerStyle}>
        <Button className="p-col-fixed" icon="pi pi-chevron-left" onClick={this.props.clearCallback} />
        <div className="p-col-fixed" style={this.selectedCountStyle}>
          {this.props.selectedCount}
        </div>
        <div className="p-col" style={this.fullWidthStyle}>
          &nbsp;
        </div>
        <Button className="p-col-fixed" icon="pi pi-trash" onClick={this.props.deleteCallback} />
        {this.props.menuModel && (
          <>
            <Menu model={this.props.menuModel} popup={true} ref={el => (this.menu = el)} />
            <Button
              className="p-col-fixed"
              icon="pi pi-bars"
              style={this.menuStyle}
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

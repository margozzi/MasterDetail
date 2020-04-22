import {PropTypes} from 'prop-types';
import React, {PureComponent} from 'react';

class KeyValuePanel extends PureComponent {
  tableStyle = {
    width: '100%',
  };

  labelStyle = {
    fontWeight: 'bold',
    padding: '3px 10px 3px 0px',
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
    width: '1px',
  };

  valueStyle = {
    padding: '3px 0px 3px 20px',
    maxWidth: '1px',
  };

  buildRows = () => {
    var rows = [];
    for (var i = 0; i < this.props.labels.length; i++) {
      rows.push(
        <tr key={i}>
          <td style={this.labelStyle}>{this.props.labels[i] + ':'}</td>
          <td style={this.valueStyle}>{this.props.values[i]}</td>
        </tr>
      );
    }
    return rows;
  };

  render() {
    return (
      <table style={this.tableStyle}>
        <tbody>{this.buildRows()}</tbody>
      </table>
    );
  }
}

export default KeyValuePanel;

KeyValuePanel.propTypes = {
  /** The labeles to be used for the values, : will be appended */
  labels: PropTypes.array.isRequired,
  /** The values to be displayed. SHould be in the same order as the labels. */
  values: PropTypes.array.isRequired,
};

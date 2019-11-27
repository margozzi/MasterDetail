import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import SelectionButton from '../SelectionButton/SelectionButton';

class Summary extends Component {
  containerStyle = {
    flexWrap: 'nowrap',
    cursor: 'pointer',
    marginRight: '0em',
    marginLeft: '0em',
    marginTop: '0.5em',
  };

  boldText = {
    fontSize: '14px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  normalText = {
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.showDetail = this.showDetail.bind(this);
  }

  handleSelection = event => {
    this.setState({selected: !this.state.selected});
    if (this.props.onSelection) {
      this.props.onSelection(!this.state.selected, this.props.itemData);
    }
  };

  showDetail = event => {
    if (this.props.onShowDetails) {
      this.props.onShowDetails(this.props.itemData);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.setState({selected: this.props.selected});
    }
  }

  render() {
    return (
      <div className="p-grid p-align-center p-justify-start" style={this.containerStyle}>
        <div className="p-col-fixed">
          <SelectionButton
            selected={this.state.selected}
            nameField="user"
            itemData={this.props.itemData}
            onClick={this.handleSelection}
          ></SelectionButton>
        </div>
        <div className="p-col" onClick={this.showDetail}>
          <div style={this.boldText}>{this.props.itemData[this.props.line1Field]}</div>
          <div style={this.normalText}>{this.props.itemData[this.props.line2Field]}</div>
          <div style={this.normalText}>{this.props.itemData[this.props.line3Field]}</div>
        </div>
      </div>
    );
  }
}

export default Summary;

Summary.defaultProps = {
  idField: 'id',
  selected: false,
  onSelection: () => {
    alert('Please add a selection callback');
  },
  onShowDetails: () => {
    alert('Please add a show details callback');
  },
};

Summary.propTypes = {
  /** The data object to be used to grab values from */
  itemData: PropTypes.object.isRequired,
  /** The property name to be used to get an id for this object. */
  idField: PropTypes.string.isRequired,
  /** The propery name to be used for the 1st line of the summary */
  line1Field: PropTypes.string.isRequired,
  /** The propery name to be used for the 2nd line of the summary */
  line2Field: PropTypes.string.isRequired,
  /** The propery name to be used for the 3rd line of the summary */
  line3Field: PropTypes.string.isRequired,
  /** Should this initially render as selected? */
  selected: PropTypes.bool,
  /** Callback to call when this Summary button is clicked */
  onSelection: PropTypes.func.isRequired,
  /** Callback to call when the Summary text is clicked  */
  onShowDetails: PropTypes.func,
};

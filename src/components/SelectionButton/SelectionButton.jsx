import {PropTypes} from 'prop-types';
import React, {Component} from 'react';

class SelectionButton extends Component {
  initials;
  bgColor;

  colors = [
    '#FF9AA2',
    '#FFB7B2',
    '#FFDAC1',
    '#E2F0CB',
    '#B5EAD7',
    '#C7CEEA',
    '#E0BBE4',
    '#957DAD',
    '#D291BC',
    '#FEC8D8',
    '#FFDFD3',
    '#C7CEEA',
    '#FF9AA2',
    '#B5EAD7',
    '#BED7D1',
    '#F8D1E0',
  ];

  circleStyle = {
    backgroundColor: this.props.bgColor ? this.props.bgColor : this.colors[0],
    borderRadius: '50%',
    border: 'solid 1px black',
    width: 36,
    height: 36,
    cursor: 'pointer',
    color: 'black',
    fontSize: '16px',
    flexWrap: 'nowrap',
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
    if (this.props.initials) {
      this.initials = this.props.initials;
    } else {
      if (this.props.itemData) {
        this.initials = this.calculateInitials(this.props.itemData[this.props.nameField]);
      } else if (this.props.name) {
        this.initials = this.calculateInitials(this.props.name);
      }
    }
    this.circleStyle = this.setCircleSize(this.props.size);
    if (this.props.bgColor) {
      this.bgColor = this.props.bgColor;
    } else {
      if (this.props.itemData) {
        this.bgColor = this.calculateColor(this.props.itemData[this.props.nameField]);
      } else if (this.props.name) {
        this.bgColor = this.calculateColor(this.props.name);
      } else {
        this.bgColor = this.calculateColor(this.props.initials);
      }
    }
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  updateCircle = (bgColor, textColor) => {
    return {...this.circleStyle, backgroundColor: bgColor, color: textColor};
  };

  setCircleSize = size => {
    var diameter;
    var fontSize;
    switch (size) {
      case 'small':
        diameter = '28px';
        fontSize = '12px';
        break;

      case 'large':
        diameter = '48px';
        fontSize = '20px';
        break;

      case 'medium':
      default:
        diameter = '36px';
        fontSize = '16px';
    }
    return {
      ...this.circleStyle,
      width: diameter,
      height: diameter,
      fontSize: fontSize,
    };
  };

  toggleSelected = e => {
    e.stopPropagation();
    this.setState({selected: !this.state.selected});
    this.props.onClick(!this.state.selected, this.props.itemData);
  };

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.setState({selected: this.props.selected});
    }
  }

  render() {
    var bgColor = this.state.selected ? this.props.selectedColor : this.bgColor;
    var textColor = this.state.selected ? this.props.selectedTextColor : 'black';
    this.circleStyle = this.updateCircle(bgColor, textColor);
    var text = this.state.selected ? this.props.selectedText : this.initials;
    return (
      <div
        className="p-grid p-align-center p-justify-center p-nogutter"
        style={this.circleStyle}
        onClick={this.toggleSelected}
      >
        <div className="p-col-fixed" style={this.textStyle}>
          {text}
        </div>
      </div>
    );
  }

  calculateInitials = name => {
    if (name) {
      var parts = name.split(' ');
      var initials = parts[0][0];
      if (parts.length > 1) {
        initials += parts[1][0];
      }
      return initials;
    }
  };

  // Borrowed from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  hashCode(str) {
    if (str) {
      return str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0);
    } else {
      return 0;
    }
  }

  calculateColor = str => {
    var hash = this.hashCode(str) % 16;
    return this.colors[Math.abs(hash)];
  };
}

export default SelectionButton;

SelectionButton.defaultProps = {
  selectedColor: '#339CFF',
  selectedText: '\u2713', // Checkmark
  selectedTextColor: 'white',
  size: 'medium',
};

SelectionButton.propTypes = {
  /** The source item data object to extract fields from. */
  itemData: PropTypes.object,
  /** The "initials" of the item to display in the circle. */
  initials: PropTypes.string,
  /** The "full name" of the item to display. */
  name: PropTypes.string,
  /** The key of the "name" field to use. */
  nameField: PropTypes.string,
  /** The background color to use for the selection circle. */
  bgColor: PropTypes.string,
  /** The background color to use when selected */
  selectedColor: PropTypes.string,
  /** The Text to show in the circle when selcted. Defaults to a check mark */
  selectedText: PropTypes.string,
  /** Text color when selected. Defaults to white */
  selectedTextColor: PropTypes.string,
  /** how large should the circle be. Size can be small, medium or large */
  size: PropTypes.string,
  /** An on-click handler. */
  onClick: PropTypes.func,
};

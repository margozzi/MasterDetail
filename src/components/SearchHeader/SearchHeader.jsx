import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Menu} from 'primereact/menu';
import {PropTypes} from 'prop-types';
import React, {PureComponent} from 'react';

class SearchHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.label = React.createRef();
    this.state = {
      searchString: this.props.initialSearch,
    };

    this.toggleLabel = this.toggleLabel.bind(this);
    this.debounce = this.debounce.bind(this);
  }

  toggleLabel = () => {
    if (this.label.current) {
      this.label.current.hidden = !this.label.current.hidden;
    }
  };

  render() {
    return (
      <div className="p-grid p-align-center p-nogutter" style={{marginBottom: '10px'}}>
        {this.props.label && (
          <div ref={this.label} className="p-col-fixed" style={{fontSize: '24px', marginRight: '20px'}}>
            {this.props.label}
          </div>
        )}
        <div className="p-inputgroup p-col">
          <InputText
            onFocus={this.props.hideLabel ? this.toggleLabel : () => {}}
            onBlur={this.props.hideLabel ? this.toggleLabel : () => {}}
            style={{width: '100%'}}
            placeholder="Search"
            value={this.state.searchString}
            onChange={e => {
              this.setState({searchString: e.target.value});
              this.search(e.target.value);
            }}
          />
        </div>
        {this.props.menuModel && (
          <>
            <Menu model={this.props.menuModel} popup={true} ref={el => (this.menu = el)} />
            <Button
              className="p-col-fixed"
              icon="pi pi-bars"
              style={{marginLeft: '20px'}}
              onClick={event => this.menu.toggle(event)}
            />
          </>
        )}
      </div>
    );
  }

  // Borrowed from here:  https://stackoverflow.com/questions/52561133/how-to-perform-debounce-on-onchange-react-event
  // Other options involve installing libraries like lodash wich seems overkill.
  debounce = (func, wait) => {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  search = this.debounce(searchString => {
    this.props.searchCallback(searchString);
  }, 400);
}

export default SearchHeader;

SearchHeader.propTypes = {
  /** The label to be used to identify the array of data. Optional */
  label: PropTypes.string,
  /** Should the label be hidden while entering search text. Usefull on small displays. Defaults to false */
  hideLabel: PropTypes.bool,
  /** What if anything should the search filed contain initially */
  initialSearch: PropTypes.string,
  /** The number of miliseconds to wait before calling back with a new search string */
  debounceTime: PropTypes.number,
  /** Search callback. The funtion to call when the search field has changed and no firther changes within the debounce time. */
  searchCallback: PropTypes.func.isRequired,
  /** Supply a menu model if you want to display a menu at the far right of the header. */
  menuModel: PropTypes.array,
};

SearchHeader.defaultProps = {
  hideLabel: false,
};

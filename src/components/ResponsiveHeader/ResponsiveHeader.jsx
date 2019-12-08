import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import SearchHeader from '../SearchHeader/SearchHeader';
import SelectionHeader from '../SelectionHeader/SelectionHeader';

class ResponsiveHeader extends Component {
  render = () => {
    return (
      <>
        {this.props.mobile && this.props.selectedCount === 0 && (
          <SearchHeader
            label={this.props.label}
            searchString={this.props.searchString}
            searchCallback={this.props.searchCallback}
            hideLabel={true}
            menuModel={this.props.menuModel}
          ></SearchHeader>
        )}
        {this.props.mobile && this.props.selectedCount > 0 && (
          <SelectionHeader
            clearCallback={this.props.clearCallback}
            deleteCallback={this.props.deleteCallback}
            selectedCount={this.props.selectedCount}
            menuModel={this.props.menuModel}
          ></SelectionHeader>
        )}
        {!this.props.mobile && (
          <SearchHeader
            label={this.props.label}
            searchString={this.props.searchString}
            searchCallback={this.props.searchCallback}
            menuModel={this.props.menuModel}
          ></SearchHeader>
        )}
      </>
    );
  };
}

export default ResponsiveHeader;

ResponsiveHeader.propTypes = {
  /** The label to be used to identify the array of data */
  label: PropTypes.string,
  /** Use an overlay panel to show detail, else inline. Defaults to false */
  mobile: PropTypes.bool.isRequired,
  /** Initial search string. Optional */
  searchString: PropTypes.string,
  /** Callback for when the search string has changed. */
  searchCallback: PropTypes.func.isRequired,
  /** If you would like a menu to the far left, provide a model here */
  menuModel: PropTypes.array,
  /** callback for when the selection should be cleared */
  clearCallback: PropTypes.func.isRequired,
  /** callback for when the passed items should be deleted */
  deleteCallback: PropTypes.func.isRequired,
  /** The number of items selected */
  selectedCount: PropTypes.number.isRequired,
};

import {OverlayPanel} from 'primereact/overlaypanel';
import {PropTypes} from 'prop-types';
import queryString from 'query-string';
import React, {Component} from 'react';
import ResizeDetector from 'react-resize-detector';
import {withRouter} from 'react-router-dom';
import DeviceDetails from '../DeviceDetail/DeviceDetails';
import YesNoDialog from '../YesNoDialog/YesNoDialog';
import ResponsiveTable from '../ResponsiveTable/ResponsiveTable';
import ResponsiveHeader from '../ResponsiveHeader/ResponsiveHeader';
import './MasterDetail.css';

class MasterDetail extends Component {
  // Holds the current size of the component
  size = '';

  selectionMenuItems = [
    {
      label: 'Selection',
      items: [
        {
          label: 'Select All',
          command: () => {
            this.changeAll(true);
          },
        },
        {
          label: 'Select None',
          command: () => {
            this.changeAll(false);
          },
        },
      ],
    },
  ];

  editMenuItem = {
    label: 'Edit',
    command: () => {},
  };

  disableMenuItem = {
    label: 'Disable',
    command: () => {
      this.setEnabledState(false);
    },
  };

  enableMenuItem = {
    label: 'Enable',
    command: () => {
      this.setEnabledState(true);
    },
  };

  setEnabledState = state => {
    var clone = [...this.state.data];
    this.state.selected.forEach(item => {
      for (var i = 0; i < clone.length; i++) {
        if (clone[i].id === item.id) {
          item.enabled = state;
          break;
        }
      }
    });
    this.setState({data: clone});
  };

  deleteMenuItem = {
    label: 'Delete',
    command: () => {
      this.confirmDialog.current.setVisible(true);
    },
  };

  overlayStyle = {
    width: '550px',
    height: '550px',
    maxHeight: '80vh',
    overflow: 'auto',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  constructor(props) {
    super(props);
    this.label = React.createRef();
    this.confirmDialog = React.createRef();
    this.state = {
      selected: [],
      data: this.props.data,
      totalRecords: this.props.data.length,
      detailItem: null,
      searchString: '',
    };
    this.onRowClicked = this.onRowClicked.bind(this);
    this.onSummarySelection = this.onSummarySelection.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.updateSelectedAndUrl = this.updateSelectedAndUrl.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  getInitialSelection = data => {
    let selected = [];
    if (this.props.location.search) {
      const query = queryString.parse(this.props.location.search);
      if (query.selected) {
        const idArray = query.selected.split(',');
        for (let i = 0; i < idArray.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (parseInt(idArray[i]) === data[j].id) {
              selected.push(data[j]);
              break;
            }
          }
        }
      }
    }
    return selected;
  };

  getInitialDetail = data => {
    if (this.size !== 'mobile' && this.props.location.search) {
      const query = queryString.parse(this.props.location.search);
      if (query.detail) {
        const id = parseInt(query.detail);
        for (let i = 0; i < data.length; i++) {
          if (id === data[i].id) {
            return data[i];
          }
        }
      }
    }
    return null;
  };

  getInitialSearch = () => {
    if (this.props.location.search) {
      const query = queryString.parse(this.props.location.search);
      if (query.search) {
        return query.search;
      }
    }
    return '';
  };

  buildMenu = () => {
    let menuItems = this.selectionMenuItems.slice(0);
    if (this.state.selected.length > 0) {
      let actions = {
        label: 'Actions',
        items: [],
      };
      menuItems.push(actions);
      // static menu item
      if (this.state.selected.length === 1) actions.items.push(this.editMenuItem);
      // Dynamic menu items
      let enabledCount = 0;
      let disabledCount = 0;

      this.state.selected.forEach(item => {
        item.enabled ? enabledCount++ : disabledCount++;
      });
      if (enabledCount > 0) actions.items.push(this.disableMenuItem);
      if (disabledCount > 0) actions.items.push(this.enableMenuItem);
      actions.items.push(this.deleteMenuItem);
    }
    return menuItems;
  };

  onSearch = searchString => {
    this.setState({searchString: searchString});
    let newQuery = queryString.parse(this.props.location.search);
    if (searchString === '') {
      delete newQuery.search;
    } else {
      newQuery.search = searchString;
    }
    this.props.history.replace({
      search: queryString.stringify(newQuery, {encode: false}),
    });
    this.search(searchString);
  };

  componentDidMount() {
    // Temporary code
    this.search(this.getInitialSearch());
    this.setState({
      selected: this.getInitialSelection(this.props.data),
      detailItem: this.getInitialDetail(this.props.data),
      searchString: this.getInitialSearch(),
    });
  }

  getSize = width => {
    const breakpoints = this.props.breakpoints;
    if (width < breakpoints[0]) {
      return 'mobile';
    } else if (width >= breakpoints[0] && width < breakpoints[1]) {
      return 'small';
    } else if (width >= breakpoints[1] && width < breakpoints[2]) {
      return 'medium';
    } else {
      return 'large';
    }
  };

  render() {
    return (
      <ResizeDetector
        handleWidth
        render={({width}) => {
          this.size = this.getSize(width);
          const mobile = this.size === 'mobile';
          return (
            <div className="p-grid" style={this.size !== 'small' ? {flexWrap: 'nowrap'} : {}}>
              <YesNoDialog
                ref={this.confirmDialog}
                header="Delete"
                message="Are you sure you want to delete the selected items?"
                callBack={this.deleteSelected}
                maxWidth="370px"
              ></YesNoDialog>
              <div className="p-col" style={{margin: '10px', flexBasis: '400px'}}>
                {!mobile && this.props.useOverlay && (
                  <OverlayPanel style={this.overlayStyle} ref={el => (this.overlayPanel = el)}>
                    <DeviceDetails itemData={this.state.detailItem || {}} onClose={this.clearDetails} />
                  </OverlayPanel>
                )}
                <ResponsiveHeader
                  label="Devices"
                  searchString={this.state.searchString}
                  clearCallback={this.clearSelection}
                  deleteCallback={() => this.confirmDialog.current.setVisible(true)}
                  selectedCount={this.state.selected.length}
                  searchCallback={this.onSearch}
                  mobile={mobile}
                  menuModel={this.buildMenu()}
                ></ResponsiveHeader>
                <ResponsiveTable
                  data={this.state.data}
                  line1Field="user"
                  line2Field="mac"
                  line3Field="name"
                  columnModel={this.props.columnModel}
                  breakpoints={this.props.breakpoints}
                  breakpointColumns={this.props.breakpointColumns}
                  selected={this.state.selected}
                  detailItem={this.state.detailItem}
                  selectionChangeCallback={this.updateSelectedAndUrl}
                  rowClickCallback={this.onRowClicked}
                ></ResponsiveTable>
              </div>
              {this.state.detailItem && !mobile && !this.props.useOverlay && (
                <div className="p-col" style={{flexBasis: '500px', minWidth: '400px', maxWidth: '600px'}}>
                  <DeviceDetails itemData={this.state.detailItem} onClose={this.clearDetails} />
                </div>
              )}
            </div>
          );
        }}
      />
    );
  }

  onRowClicked = item => {
    let newQuery = queryString.parse(this.props.location.search);
    if (item === this.state.detailItem) {
      this.setState({detailItem: null}); // toggle it if already selected
      if (this.overlayPanel) {
        this.overlayPanel.hide();
      }
      delete newQuery.detail;
    } else {
      this.setState({detailItem: item});
      if (this.overlayPanel) {
        this.overlayPanel.show(item);
      }
      newQuery.detail = item.id;
    }
    this.props.history.replace({
      search: queryString.stringify(newQuery, {encode: false}),
    });
  };

  updateSelectedAndUrl = selected => {
    this.setState({selected: selected});
    let newQuery = queryString.parse(this.props.location.search);
    const selectedIds = this.buildIdList(selected);
    if (selectedIds) {
      newQuery.selected = selectedIds;
    } else {
      delete newQuery.selected;
    }
    this.props.history.replace({
      search: queryString.stringify(newQuery, {encode: false}),
    });
  };

  buildIdList = selected => {
    if (selected.length === 0) {
      return null;
    } else {
      let str = '';
      selected.forEach((value, index) => {
        str += value.id;
        if (selected.length > index + 1) {
          str += ',';
        }
      });
      return str;
    }
  };

  changeAll = selected => {
    if (selected) {
      this.updateSelectedAndUrl(this.state.data);
    } else {
      this.clearSelection();
    }
  };

  clearSelection = () => {
    this.updateSelectedAndUrl([]);
  };

  clearDetails = () => {
    this.setState({detailItem: null});
    if (this.props.useOverlay) {
      this.overlayPanel.hide();
    }
  };

  deleteSelected = () => {
    let filtered = this.state.data.filter(item => {
      return this.state.selected.includes(item) === false;
    });
    this.setState({data: filtered});
    this.confirmDialog.current.setVisible(false);
  };

  loadingText() {
    return <span className="loading-text"></span>;
  }

  onSummarySelection = (selected, item) => {
    var clone = [...this.state.selected];
    if (selected) {
      clone.push(item);
    } else {
      for (var i = 0; i < clone.length; i++) {
        if (clone[i].id === item.id) {
          clone.splice(i, 1);
          break;
        }
      }
    }
    this.updateSelectedAndUrl(clone);
  };

  // Only called for mobile
  showDetails = item => {
    this.props.history.push('/devices/' + item.id);
  };

  // Borrowed from here:  https://stackoverflow.com/questions/52561133/how-to-perform-debounce-on-onchange-react-event
  // Other options involve installing libraries like lodash wich seems overkill.
  debounce = (func, wait) => {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  search = this.debounce(searchString => {
    if (searchString.length === 0) {
      this.setState({
        data: this.props.data,
        totalRecords: this.props.data.length,
      });
    } else {
      const newArray = this.props.data.filter(item => {
        return item.user.includes(searchString);
      });
      this.setState({
        data: newArray,
        totalRecords: newArray.length,
      });
    }
  }, 400);
}

export default withRouter(MasterDetail);

MasterDetail.propTypes = {
  /** The label to be used to identify the array of data */
  label: PropTypes.string.isRequired,
  /** An array of data that will be used in the master table and the details panel */
  data: PropTypes.array.isRequired,
  /** Column Model to be used on the PrimeReact DataTable */
  columnModel: PropTypes.array.isRequired,
  /** Widths at which the table should respond */
  breakpoints: PropTypes.array,
  /** Number of columns to show at each breakpoint width */
  breakpointColumns: PropTypes.array,
  /** Use an overlay panel to show detail, else inline. Defaults to false */
  useOverlay: PropTypes.bool,
};

MasterDetail.defaultProps = {
  breakpoints: [480, 839, 1024],
  breakpointColumns: [3, 6, 9],
  useOverlay: true,
};

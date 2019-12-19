import {OverlayPanel} from 'primereact/overlaypanel';
import {PropTypes} from 'prop-types';
import queryString from 'query-string';
import React, {Component} from 'react';
import ResizeDetector from 'react-resize-detector';
import {withRouter} from 'react-router-dom';
import YesNoDialog from '../YesNoDialog/YesNoDialog';
import ResponsiveTable from '../ResponsiveTable/ResponsiveTable';
import ResponsiveHeader from '../ResponsiveHeader/ResponsiveHeader';
import './MasterDetail.css';

class MasterDetail extends Component {
  // Is the current width considered 'mobile' size?
  mobile = false;

  constructor(props) {
    super(props);
    this.label = React.createRef();
    this.confirmDialog = React.createRef();
    this.state = {
      selected: [],
      data: [],
      totalRecords: 0,
      detailItem: null,
      searchString: '',
      initialSearchString: '',
    };
    this.props.dataService.setReloadCallback(this.load);
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
    if (!this.mobile && this.props.location.search) {
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
    let menuItems = [
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
    if (this.props.menuProvider) {
      const providedItems = this.props.menuProvider.buildMenu(this.state.selected);
      if (providedItems) {
        menuItems.push(providedItems);
      }
    }
    if (this.state.selected.length > 0) {
      menuItems.push({
        label: 'Delete',
        command: this.onDelete,
      });
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
    this.load({filter: searchString});
  };

  componentDidMount = () => {
    document.addEventListener('keydown', this.keyboardNav, false);
    const initialSearchString = this.getInitialSearch();
    this.props.dataService
      .list({filter: initialSearchString})
      .then(response => {
        const detailItem = this.getInitialDetail(response);
        const selected = this.getInitialSelection(response);
        this.setState({
          data: response,
          totalRecords: response.length,
          selected: selected,
          detailItem: detailItem,
          initialSearchString: initialSearchString,
        });
        this.props.selectionChangedCallback(selected);
        if (this.overlayPanel && detailItem) {
          this.overlayPanel.show(detailItem);
        }
      })
      .catch(error => console.log(error));
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.keyboardNav, false);
  };

  keyboardNav = event => {
    if (this.state.detailItem) {
      let index = this.state.data.indexOf(this.state.detailItem);

      if (event.keyCode === 38 && index > 0) {
        //Arrow Up
        this.setState({detailItem: this.state.data[index - 1]});
      } else if (event.keyCode === 40 && index < this.state.totalRecords - 1) {
        // Arrow Down
        this.setState({detailItem: this.state.data[index + 1]});
      }
    }
  };

  getSize = width => {
    let breakpoints = this.props.breakpoints;
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
    const detailPanel = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        itemData: this.state.detailItem,
        onClose: this.clearDetails,
      });
    });

    return (
      <ResizeDetector
        handleWidth
        render={({width}) => {
          const size = this.getSize(width);
          this.mobile = size === 'mobile';
          const flexBasis = this.props.breakpoints[0] + 'px';
          return (
            <div className="p-grid p-nogutter" style={size !== 'small' ? {flexWrap: 'nowrap'} : {}}>
              <div className="p-col" style={{flexBasis: flexBasis}}>
                <ResponsiveHeader
                  label="Devices"
                  initialSearchString={this.state.initialSearchString}
                  clearCallback={this.clearSelection}
                  deleteCallback={this.onDelete}
                  selectedCount={this.state.selected.length}
                  searchCallback={this.onSearch}
                  mobile={this.mobile}
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
              {this.state.detailItem && !this.mobile && !this.props.useOverlay && (
                <div className="p-col" style={{flexBasis: '500px', minWidth: '300px', maxWidth: '600px'}}>
                  {detailPanel}
                </div>
              )}
              <YesNoDialog
                ref={this.confirmDialog}
                header="Delete Selected Items?"
                message="Are you sure you want to delete the selected items?"
                callBack={this.deleteSelected}
                maxWidth="370px"
              ></YesNoDialog>
              {!this.mobile && this.props.useOverlay && (
                <OverlayPanel className="overlayStyle" ref={el => (this.overlayPanel = el)}>
                  {detailPanel}
                </OverlayPanel>
              )}
            </div>
          );
        }}
      />
    );
  }

  onRowClicked = item => {
    if (this.mobile) {
      this.props.history.push('/devices/' + item.id);
    } else {
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
    }
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
    this.props.selectionChangedCallback(selected);
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
    if (this.props.useOverlay && this.overlayPanel) {
      this.overlayPanel.hide();
    }
  };

  onDelete = () => {
    if (this.props.confirmDelete) {
      this.confirmDialog.current.setVisible(true);
    } else {
      this.deleteSelected();
    }
  };

  deleteSelected = () => {
    this.props.dataService
      .delete(this.state.selected)
      .then(() => {
        this.confirmDialog.current.setVisible(false);
        this.load();
        this.clearSelection();
      })
      .catch(reason => {
        alert(reason);
      });
  };

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

  load = config => {
    this.props.dataService.list(config).then(response => {
      this.setState({
        data: response,
        totalRecords: response.length,
      });
    });
  };
}

export default withRouter(MasterDetail);

MasterDetail.propTypes = {
  /** The label to be used to identify the array of data */
  label: PropTypes.string.isRequired,
  /** An array of data that will be used in the master table and the details panel */
  // data: PropTypes.array.isRequired,
  /** Column Model to be used on the PrimeReact DataTable */
  columnModel: PropTypes.array.isRequired,
  /** Widths at which the table should respond */
  breakpoints: PropTypes.array,
  /** Number of columns to show at each breakpoint width */
  breakpointColumns: PropTypes.array,
  /** Use an overlay panel to show detail, else inline. Defaults to false */
  useOverlay: PropTypes.bool,
  /** Data Service. Used to fatch data */
  dataService: PropTypes.object.isRequired,
  /** Should a confirmation dialog be shown before deleting */
  confirmDelete: PropTypes.bool,
  /** Menu provider to help build the menu and flex based on selection */
  menuProvider: PropTypes.object,
  /** Callback when row selection has changed  */
  selectionChangedCallback: PropTypes.func,
};

MasterDetail.defaultProps = {
  breakpoints: [480, 839, 1024],
  breakpointColumns: [3, 6, 9],
  useOverlay: true,
  confirmDelete: true,
  selectionChangedCallback: () => {},
};

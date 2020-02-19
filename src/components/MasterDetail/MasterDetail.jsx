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
import WaitSpinner from './../WaitSpinner/WaitSpinner';

class MasterDetail extends Component {
  // Is the current width considered 'mobile' size?
  mobile = false;

  constructor(props) {
    super(props);
    this.label = React.createRef();
    this.confirmDialog = React.createRef();
    this.state = {
      loading: false,
      selected: [],
      data: [],
      totalRecords: 0,
      detailItem: null,
      searchString: '',
      initialSearchString: '',
    };
    if (this.props.dataService) {
      this.props.dataService.setReloadCallback(this.load);
    }
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
    if (this.props.dataService) {
      this.props.dataService
        .list({filter: initialSearchString})
        .then(response => {
          const detailItem = this.getInitialDetail(response);
          const selected = this.getInitialSelection(response);
          this.setState({
            loading: false,
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
        .catch(error => {
          console.log(error);
          this.setState({loading: false});
        });
      this.setState({loading: true});
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.keyboardNav, false);
  };

  keyboardNav = event => {
    if (this.state.detailItem) {
      let index = this.state.data.indexOf(this.state.detailItem);

      if (event.keyCode === 38 && index > 0) {
        //Arrow Up
        this.setState({detailItem: this.state.data[index - 1]}, this.updateSelectedAndUrl);
      } else if (event.keyCode === 40 && index < this.state.totalRecords - 1) {
        // Arrow Down
        this.setState({detailItem: this.state.data[index + 1]}, this.updateSelectedAndUrl);
      }
    }
  };

  getSize = (width, inlineDetail) => {
    let breakpoints = this.props.breakpoints;
    width = inlineDetail ? width - this.props.detailWidth : width;
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
          if (!width) {
            return <div></div>;
          }
          const inlineDetail = this.state.detailItem && !this.props.useOverlay;
          const size = this.getSize(width, inlineDetail);
          this.mobile = size === 'mobile' && !this.state.detailItem;
          const flexBasis = this.mobile ? null : this.props.breakpoints[0] + 'px';
          return (
            <>
              <div className="p-grid p-nogutter" style={{flexWrap: 'nowrap'}}>
                <div className="p-col" style={{flexGrow: 1, flexShrink: 0, flexBasis: flexBasis}}>
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
                    nameField={this.props.nameField}
                    line1Field={this.props.line1Field}
                    line2Field={this.props.line2Field}
                    line3Field={this.props.line3Field}
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
                  <div
                    className="p-col detail-highlight"
                    style={{
                      minWidth: this.props.detailWidth,
                      flexGrow: 0,
                      flexShrink: 1,
                      flexBasis: this.props.detailWidth,
                    }}
                  >
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
              {this.state.loading && <WaitSpinner />}
            </>
          );
        }}
      />
    );
  }

  onRowClicked = item => {
    if (this.mobile) {
      this.props.history.push(this.props.location.pathname + '/' + item.id);
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
    let newQuery = queryString.parse(this.props.location.search);
    if (selected) {
      const selectedIds = this.buildIdList(selected);
      if (selectedIds) {
        newQuery.selected = selectedIds;
      } else {
        delete newQuery.selected;
      }
    }
    if (this.state.detailItem) {
      newQuery.detail = this.state.detailItem.id;
    } else {
      delete newQuery.detail;
    }
    this.props.history.replace({
      search: queryString.stringify(newQuery, {encode: false}),
    });
    if (selected) {
      this.setState({selected: selected});
      this.props.selectionChangedCallback(selected);
    }
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
    this.setState({detailItem: null}, this.updateSelectedAndUrl);
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
    if (this.props.dataService) {
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
    }
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
    if (this.props.dataService) {
      this.props.dataService.list(config).then(response => {
        this.setState({
          loading: false,
          data: response,
          totalRecords: response.length,
        });
      });
      this.setState({loading: true});
    }
  };
}

export default withRouter(MasterDetail);

MasterDetail.propTypes = {
  /** The label to be used to identify the array of data */
  label: PropTypes.string.isRequired,
  /** An array of data that will be used in the master table and the details panel */
  data: PropTypes.array,
  /** Column Model to be used on the PrimeReact DataTable */
  columnModel: PropTypes.array.isRequired,
  /** Widths at which the table should respond */
  breakpoints: PropTypes.array,
  /** Number of columns to show at each breakpoint width */
  breakpointColumns: PropTypes.array,
  /** Use an overlay panel to show detail, else inline. Defaults to false */
  useOverlay: PropTypes.bool,
  /** If not using overlay specify a width for the detail */
  detailWidth: PropTypes.number,
  /** Data Service. Used to fatch data */
  dataService: PropTypes.object,
  /** Should a confirmation dialog be shown before deleting */
  confirmDelete: PropTypes.bool,
  /** Menu provider to help build the menu and flex based on selection */
  menuProvider: PropTypes.object,
  /** Callback when row selection has changed  */
  selectionChangedCallback: PropTypes.func,
  /** Id field that is unique per dat record */
  idField: PropTypes.string,
  /** The property name used to create the initials in the select button */
  nameField: PropTypes.string,
  /** Most prominant summary field to display in mobile size*/
  line1Field: PropTypes.string.isRequired,
  /** Second summary field to display in mobile size*/
  line2Field: PropTypes.string,
  /**Third summary field to display in mobile size*/
  line3Field: PropTypes.string,
};

MasterDetail.defaultProps = {
  idField: 'id',
  breakpoints: [480, 839, 1024],
  breakpointColumns: [3, 6, 9],
  useOverlay: true,
  detailWidth: 500,
  confirmDelete: true,
  selectionChangedCallback: () => {},
};

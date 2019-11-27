import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { OverlayPanel } from 'primereact/overlaypanel';
import { PropTypes } from 'prop-types';
import queryString from 'query-string';
import React, { Component } from 'react';
import Media from 'react-media';
import { withRouter } from 'react-router-dom';
import ColumnFormatter from '../../services/ColumnFormatter';
import DeviceDetails from '../DeviceDetail/DeviceDetails';
import SelectionButton from '../SelectionButton/SelectionButton';
import Summary from '../Summary/Summary';
import './MasterDetail.css';
import YesNoDialog from '../YesNoDialog/YesNoDialog';

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
    command: () => { },
  };

  disableMenuItem = {
    label: 'Disable',
    command: () => {
      var clone = [...this.state.data];
      this.state.selected.forEach(item => {
        for (var i = 0; i < clone.length; i++) {
          if (clone[i].id === item.id) {
            item.enabled = false;
            break;
          }
        }
      });
      this.setState({ data: clone });
    },
  };

  enableMenuItem = {
    label: 'Enable',
    command: () => {
      var clone = [...this.state.data];
      this.state.selected.forEach(item => {
        for (var i = 0; i < clone.length; i++) {
          if (clone[i].id === item.id) {
            item.enabled = true;
            break;
          }
        }
      });
      this.setState({ data: clone });
    },
  };

  deleteMenuItem = {
    label: 'Delete',
    command: () => {
      this.confirmDialog.current.setVisible(true);
    },
  };

  revokeMenuItem = {
    label: 'Revoke Certificate',
    command: () => {
      //TODO
    },
  };

  panelStyle = {
    padding: '10px',
  };

  centerStyle = {
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

  columnModelSmall = [
    { field: 'user', header: 'User', width: 140 },
    { field: 'mac', header: 'MAC Address', width: 140 },
    { field: 'name', header: 'Name', width: 200 },
  ];

  mediumColumns = [
    { field: 'role', header: 'Role', width: 80 },
    { field: 'manufacturer', header: 'Manufacturer', width: 120 },
    { field: 'type', header: 'Type', width: 130 },
    { field: 'model', header: 'Model', width: 80 },
  ];

  largeColumns = [
    { field: 'status', header: 'Status', width: 70 },
    { field: 'credentials', header: 'Credentials', width: 110 },
    { field: 'enabled', header: 'Enabled', width: 80, formatter: new ColumnFormatter({ field: 'enabled' }).yesNoTemplate },
    { field: 'active', header: 'Active', width: 80, formatter: new ColumnFormatter({ field: 'active' }).yesNoTemplate },
    { field: 'added', header: 'Added', width: 100, formatter: new ColumnFormatter({ field: 'added' }).dateShortTemplate },
    {
      field: 'expires',
      header: 'Cert Expires',
      width: 100,
      formatter: new ColumnFormatter({ field: 'expires' }).dateFromNowTemplate,
    },
  ];

  constructor(props) {
    super(props);
    this.deviceLabel = React.createRef();
    this.confirmDialog = React.createRef();
    this.state = {
      selected: [],
      data: [],
      totalRecords: 0,
      detailItem: null,
      searchString: '',
    };
    this.columnModelMedium = this.columnModelSmall.concat(this.mediumColumns);
    this.columnModelLarge = this.columnModelMedium.concat(this.largeColumns);

    this.deviceTemplate = this.deviceTemplate.bind(this);
    this.onSummarySelection = this.onSummarySelection.bind(this);
    this.load = this.load.bind(this);
    this.rowClassName = this.rowClassName.bind(this);
    this.toggleDeviceLabel = this.toggleDeviceLabel.bind(this);
    this.debounce = this.debounce.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
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
      let certCount = 0;
      let pskCount = 0;

      this.state.selected.forEach(item => {
        item.enabled ? enabledCount++ : disabledCount++;
        item.credentials === 'certificate' ? certCount++ : pskCount++;
      });
      if (enabledCount > 0) actions.items.push(this.disableMenuItem);
      if (disabledCount > 0) actions.items.push(this.enableMenuItem);
      if (certCount > 0) actions.items.push(this.revokeMenuItem);
      actions.items.push(this.deleteMenuItem);
    }
    return menuItems;
  };

  buildSearchHeader = () => {
    return (
      <div className="p-grid p-align-center p-nogutter" style={{ marginBottom: '10px' }}>
        <div ref={this.deviceLabel} className="p-col-fixed" style={{ fontSize: '24px', marginRight: '20px' }}>
          Devices
        </div>
        <div className="p-inputgroup p-col">
          <InputText
            onFocus={this.size === 'mobile' ? this.toggleDeviceLabel : () => { }}
            onBlur={this.size === 'mobile' ? this.toggleDeviceLabel : () => { }}
            style={{ width: '100%' }}
            placeholder="Search Devices"
            value={this.state.searchString}
            onChange={e => {
              this.setState({ searchString: e.target.value });
              let newQuery = queryString.parse(this.props.location.search);
              if (e.target.value === '') {
                delete newQuery.search;
              } else {
                newQuery.search = e.target.value;
              }
              this.props.history.replace({
                search: queryString.stringify(newQuery, { encode: false }),
              });
              this.search(e.target.value);
            }}
          />
        </div>
        <Menu model={this.buildMenu()} popup={true} ref={el => (this.menu = el)} />
        <Button
          className="p-col-fixed"
          icon="pi pi-bars"
          style={{ marginLeft: '20px' }}
          onClick={event => this.menu.toggle(event)}
        />
      </div>
    );
  };

  toggleDeviceLabel = () => {
    if (this.deviceLabel.current) {
      this.deviceLabel.current.hidden = !this.deviceLabel.current.hidden;
    }
  };

  buildSelectionHeader = () => {
    return (
      <div className="p-grid p-align-center p-nogutter" style={{ marginBottom: '10px' }}>
        <Button className="p-col-fixed" icon="pi pi-chevron-left" onClick={this.clearSelection} />
        <div className="p-col-fixed" style={{ fontSize: '18px', marginLeft: '20px' }}>
          {this.state.selected.length}
        </div>
        <div className="p-col" style={{ width: '100%' }}>
          &nbsp;
        </div>
        <Button className="p-col-fixed" icon="pi pi-trash" />
        <Menu model={this.buildMenu()} popup={true} ref={el => (this.menu = el)} />
        <Button
          className="p-col-fixed"
          icon="pi pi-bars"
          style={{ marginLeft: '27px' }}
          onClick={event => this.menu.toggle(event)}
        />
      </div>
    );
  };

  buildColumnModel = () => {
    var model;
    switch (this.size) {
      case 'mobile':
        return <Column body={this.deviceTemplate} />;
      case 'large':
        model = this.columnModelLarge;
        break;
      case 'medium':
        model = this.columnModelMedium;
        break;
      case 'small':
      default:
        model = this.columnModelSmall;
    }

    var cm = model.map(item => (
      <Column
        field={item.field}
        header={item.header}
        loadingBody={this.loadingText}
        style={{ width: item.width + 'px' }}
        body={item.formatter}
        key={Number(item.id).toString()}
      />
    ));

    cm.unshift(
      <Column
        header={<SelectionButton initials=" " bgColor="transparent" onClick={this.changeAll} />}
        body={this.buttonTemplate}
        style={{ minWidth: '60px', width: '60px' }}
        key={'selectAll'}
      />
    );
    return cm;
  };

  buildTable = size => {
    this.size = size;
    return (
      <div className="p-grid" style={size !== 'small' ? { flexWrap: 'nowrap' } : {}}>
        <YesNoDialog
          ref={this.confirmDialog}
          header="Delete"
          message="Are you sure you want to delete the selected items?"
          callBack={this.deleteSelected}
        ></YesNoDialog>
        <div className="p-col" style={{ flexBasis: '400px' }}>
          {size !== 'mobile' && this.props.useOverlay && (
            <OverlayPanel style={this.centerStyle} ref={el => (this.overlayPanel = el)}>
              <DeviceDetails itemData={this.state.detailItem || {}} onClose={this.clearDetails} />
            </OverlayPanel>
          )}
          {size === 'mobile' && this.state.selected.length === 0 && this.buildSearchHeader()}
          {size === 'mobile' && this.state.selected.length > 0 && this.buildSelectionHeader()}
          {size !== 'mobile' && this.buildSearchHeader()}
          <DataTable
            className={size === 'mobile' ? 'no-table-header' : ''}
            value={this.state.data}
            resizableColumns={size !== 'mobile'}
            reorderableColumns={size !== 'mobile'}
            metaKeySelection={false}
            selection={this.state.selected}
            onSelectionChange={e => this.updateSelectedAndUrl(e.value)}
            scrollable={true}
            scrollHeight={size === 'mobile' ? 'calc(100vh - 70px)' : 'calc(100vh - 125px)'}
            onRowClick={e => {
              let newQuery = queryString.parse(this.props.location.search);
              if (e.data === this.state.detailItem) {
                this.setState({ detailItem: null }); // toggle it if already selected
                if (this.props.useOverlay) {
                  this.overlayPanel.hide();
                }
                delete newQuery.detail;
              } else {
                this.setState({ detailItem: e.data });
                if (this.props.useOverlay) {
                  this.overlayPanel.show(e);
                }
                newQuery.detail = e.data.id;
              }
              this.props.history.replace({
                search: queryString.stringify(newQuery, { encode: false }),
              });
            }}
            rowClassName={this.rowClassName}
          >
            {this.buildColumnModel(size)}
          </DataTable>
        </div>
        {this.state.detailItem && size !== 'mobile' && !this.props.useOverlay && (
          <div className="p-col" style={{ flexBasis: '500px', minWidth: '400px', maxWidth: '600px' }}>
            <DeviceDetails itemData={this.state.detailItem} onClose={this.clearDetails} />
          </div>
        )}
      </div>
    );
  };

  rowClassName = item => {
    return { 'p-highlight': this.isSelected(item), 'detail-highlight': this.isDetailItem(item) };
  };

  isSelected = item => {
    return this.state.selected.includes(item) && !this.isDetailItem(item);
  };

  isDetailItem = item => {
    return item === this.state.detailItem;
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

  render() {
    return (
      <div style={this.panelStyle}>
        <Media query="(max-width: 599px)">{matches => matches && this.buildTable('mobile')}</Media>

        <Media query="( min-width: 600px ) and ( max-width: 1499px )">
          {matches => matches && this.buildTable('small')}
        </Media>

        <Media query="( min-width: 1500px ) and ( max-width: 1999px )">
          {matches => matches && this.buildTable('medium')}
        </Media>

        <Media query="( min-width: 2000px )">{matches => matches && this.buildTable('large')}</Media>
      </div>
    );
  }

  updateSelectedAndUrl = selected => {
    this.setState({ selected: selected });
    let newQuery = queryString.parse(this.props.location.search);
    const selectedIds = this.buildIdList(selected);
    if (selectedIds) {
      newQuery.selected = selectedIds;
    } else {
      delete newQuery.selected;
    }
    this.props.history.replace({
      search: queryString.stringify(newQuery, { encode: false }),
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
    this.setState({ detailItem: null });
    if (this.props.useOverlay) {
      this.overlayPanel.hide();
    }
  };

  deleteSelected = () => {
    let filtered = this.state.data.filter(item => {
      return this.state.selected.includes(item) === false;
    });
    this.setState({ data: filtered });
    this.confirmDialog.current.setVisible(false);
  };

  loadingText() {
    return <span className="loading-text"></span>;
  }

  deviceTemplate = device => {
    return (
      <Summary
        itemData={device}
        idField="id"
        line1Field="user"
        line2Field="mac"
        line3Field="name"
        selected={typeof this.state.selected.find(item => item.id === device.id) !== 'undefined'}
        onSelection={this.onSummarySelection}
        onShowDetails={this.showDetails}
      ></Summary>
    );
  };

  buttonTemplate = device => {
    return (
      <SelectionButton
        size="medium"
        nameField="user"
        itemData={device}
        selected={this.state.selected.includes(device)}
        onClick={this.onSummarySelection}
      />
    );
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

  // Only called for mobile
  showDetails = item => {
    this.props.history.push('/devices/' + item.id);
  };

  load = event => {
    //var first = event.first ;
    //var count = event.rows;
    this.setState({
      data: this.props.data,
      totalRecords: this.props.data.length,
    });
  };

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
  /** An array of data that will be used in the master table and the details panel */
  data: PropTypes.array.isRequired,
  /** Use an overlay panel to show detail, else inline. Defaults to false */
  useOverlay: PropTypes.bool,
};

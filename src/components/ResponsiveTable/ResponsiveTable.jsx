import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import ResizeDetector from 'react-resize-detector';
import SelectionButton from '../SelectionButton/SelectionButton';
import Summary from '../Summary/Summary';
import './ResponsiveTable.css';

class ResponsiveTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      data: this.props.data,
      totalRecords: 0,
      detailItem: null,
    };

    this.onRowSelection = this.onRowSelection.bind(this);
    this.load = this.load.bind(this);
    this.rowClassName = this.rowClassName.bind(this);
  }

  summaryTemplate = item => {
    return (
      <Summary
        itemData={item}
        idField={this.props.idField}
        line1Field={this.props.line1Field}
        line2Field={this.props.line2Field}
        line3Field={this.props.line3Field}
        selected={typeof this.state.selected.find(selected => selected.id === item.id) !== 'undefined'}
        onSelection={this.onRowSelection}
        onShowDetails={this.props.rowClickCallback(item)}
      ></Summary>
    );
  };

  buildColumnModel = size => {
    var model;
    switch (size) {
      case 'mobile':
        return <Column body={this.summaryTemplate} />;
      case 'large':
        model = this.props.columnModel;
        break;
      case 'medium':
        model = this.props.columnModel.slice(0, this.props.breakpointColumns[1]);
        break;
      case 'small':
      default:
        model = this.props.columnModel.slice(0, this.props.breakpointColumns[0]);
    }

    var cm = model.map(item => (
      <Column
        field={item.field}
        header={item.header}
        loadingBody={this.loadingText}
        style={{width: item.width + 'px'}}
        body={item.formatter}
        key={Number(item.id).toString()}
      />
    ));

    cm.unshift(
      <Column
        header={<SelectionButton initials=" " bgColor="transparent" onClick={this.changeAll} />}
        body={this.buttonTemplate}
        style={{minWidth: '60px', width: '60px'}}
        key={'selectAll'}
      />
    );
    return cm;
  };

  rowClassName = item => {
    return {'p-highlight': this.isSelected(item), 'detail-highlight': this.isDetailItem(item)};
  };

  isSelected = item => {
    return this.state.selected.includes(item) && !this.isDetailItem(item);
  };

  isDetailItem = item => {
    return item === this.state.detailItem;
  };

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
          const size = this.getSize(width);
          const mobile = size === 'mobile';
          return (
            <div className="p-grid" style={size !== 'small' ? {flexWrap: 'nowrap'} : {}}>
              <DataTable
                className={mobile ? 'no-table-header' : ''}
                value={this.state.data}
                resizableColumns={!mobile}
                reorderableColumns={!mobile}
                metaKeySelection={false}
                selection={this.state.selected}
                onSelectionChange={e => this.updateSelectedAndUrl(e.value)}
                scrollable={true}
                scrollHeight={mobile ? 'calc(100vh - 70px)' : 'calc(100vh - 125px)'}
                onRowClick={this.onRowClick}
                rowClassName={this.rowClassName}
              >
                {this.buildColumnModel(size)}
              </DataTable>
            </div>
          );
        }}
      />
    );
  }

  changeAll = selected => {
    if (selected) {
      this.setState({selected: this.state.data});
    } else {
      this.setState({selected: []});
    }
  };

  loadingText() {
    return <span className="loading-text"></span>;
  }

  buttonTemplate = item => {
    return (
      <SelectionButton
        size="medium"
        nameField="user"
        itemData={item}
        selected={this.state.selected.includes(item)}
        onClick={this.onRowSelection}
      />
    );
  };

  onRowSelection = (selected, item) => {
    let clone = [...this.state.selected];
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
    this.setState({selected: clone});
    this.props.selectionChangeCallback(clone);
  };

  onRowClick = e => {
    if (this.isDetailItem(e.data)) {
      this.setState({detailItem: null});
    } else {
      this.setState({detailItem: e.data});
    }
    this.props.rowClickCallback(e);
  };

  load = event => {
    //var first = event.first ;
    //var count = event.rows;
    this.setState({
      data: this.props.data,
      totalRecords: this.props.data.length,
    });
  };
}

export default ResponsiveTable;

ResponsiveTable.propTypes = {
  /** An array of data that will be displayed in the table */
  data: PropTypes.array.isRequired,
  /** Id field that is unique per dat record */
  idField: PropTypes.string.isRequired,
  /** Most prominant summary field to display in mobile size*/
  line1Field: PropTypes.string.isRequired,
  /** Second summary field to display in mobile size*/
  line2Field: PropTypes.string,
  /**Third summary field to display in mobile size*/
  line3Field: PropTypes.string,
  /** An array of items that are to be initially selected. Optional */
  selected: PropTypes.array,
  /** Column Model to be used on the PrimeReact DataTable */
  columnModel: PropTypes.array.isRequired,
  /** Widths at which the table should respond */
  breakpoints: PropTypes.array,
  /** Number of columns to show at each breakpoint width */
  breakpointColumns: PropTypes.array,
  /** Callback for when a row is clicked. Called with the row data that was clicked on. */
  rowClickCallback: PropTypes.func,
  /** Callback for when row selection has changed. Called with an array of row data that was selected */
  selectionChangeCallback: PropTypes.func,
};

ResponsiveTable.defaultProps = {
  idField: 'id',
  breakpoints: [480, 839, 1024],
  breakpointColumns: [3, 6, 9],
  selected: [],
  useOverlay: true,
  rowClickCallback: () => {},
  rowSelectionCallback: () => {},
};

(this.webpackJsonpresponsive=this.webpackJsonpresponsive||[]).push([[2],{111:function(e,t,a){},116:function(e,t,a){},54:function(e,t,a){"use strict";var l=a(8),n=a(12),i=a(10),r=a(9),o=a(11),s=a(0),c=a.n(s),p=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(o)))).tableStyle={width:"100%"},a.labelStyle={fontWeight:"bold",padding:"3px 10px 3px 0px",whiteSpace:"nowrap",verticalAlign:"top",width:"1px"},a.valueStyle={padding:"3px 0px 3px 20px",maxWidth:"1px"},a.buildRows=function(){for(var e=[],t=0;t<a.props.labels.length;t++)e.push(c.a.createElement("tr",{key:t},c.a.createElement("td",{style:a.labelStyle},a.props.labels[t]+":"),c.a.createElement("td",{style:a.valueStyle},a.props.values[t])));return e},a}return Object(o.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){return c.a.createElement("table",{style:this.tableStyle},c.a.createElement("tbody",null,this.buildRows()))}}]),t}(s.Component);t.a=p},74:function(e,t,a){"use strict";var l=a(55),n=a(8),i=a(12),r=a(10),o=a(9),s=a(19),c=a(11),p=a(78),d=a(58),u=a.n(d),m=a(0),h=a.n(m),b=a(73),f=a(6),g=a(15),v=a(81),S=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).setVisible=function(e){a.setState({visible:e})},a.hide=function(){a.setVisible(!1)},a.state={visible:!1},a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=h.a.createElement("div",null,h.a.createElement(g.Button,{id:"yes",label:"Yes",icon:"pi pi-check",onClick:this.props.callBack}),h.a.createElement(g.Button,{id:"no",label:"No",icon:"pi pi-times",onClick:this.hide,className:"p-button-secondary"}));return h.a.createElement(v.Dialog,{header:this.props.header,visible:this.state.visible,style:{width:"80vw",maxWidth:this.props.maxWidth},footer:t,onHide:function(t){e.setVisible(!1)},modal:this.props.modal,closable:!1},this.props.message)}}]),t}(m.Component),C=S;S.defaultProps={modal:!0,visible:!1,maxWidth:"600px"};var y=a(84),k=a(86),x=a(53),E=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).colors=["#FF9AA2","#FFB7B2","#FFDAC1","#E2F0CB","#B5EAD7","#C7CEEA","#E0BBE4","#957DAD","#D291BC","#FEC8D8","#FFDFD3","#C7CEEA","#FF9AA2","#B5EAD7","#BED7D1","#F8D1E0"],a.circleStyle={backgroundColor:a.props.bgColor?a.props.bgColor:a.colors[0],borderRadius:"50%",border:"solid 1px black",width:36,height:36,cursor:"pointer",color:"black",fontSize:"16px",flexWrap:"nowrap"},a.updateCircle=function(e,t){return Object(x.a)({},a.circleStyle,{backgroundColor:e,color:t})},a.setCircleSize=function(e){var t,l;switch(e){case"small":t="28px",l="12px";break;case"large":t="48px",l="20px";break;case"medium":default:t="36px",l="16px"}return Object(x.a)({},a.circleStyle,{width:t,height:t,fontSize:l})},a.toggleSelected=function(e){e.stopPropagation(),a.setState({selected:!a.state.selected}),a.props.onClick(!a.state.selected,a.props.itemData)},a.calculateInitials=function(e){if(e){var t=e.split(" "),a=t[0][0];return t.length>1&&(a+=t[1][0]),a}},a.calculateColor=function(e){var t=a.hashCode(e)%16;return a.colors[Math.abs(t)]},a.state={selected:a.props.selected},a.props.initials?a.initials=a.props.initials:a.props.itemData?a.initials=a.calculateInitials(a.props.itemData[a.props.nameField]):a.props.name&&(a.initials=a.calculateInitials(a.props.name)),a.circleStyle=a.setCircleSize(a.props.size),a.props.bgColor?a.bgColor=a.props.bgColor:a.props.itemData?a.bgColor=a.calculateColor(a.props.itemData[a.props.nameField]):a.props.name?a.bgColor=a.calculateColor(a.props.name):a.bgColor=a.calculateColor(a.props.initials),a.toggleSelected=a.toggleSelected.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.selected!==e.selected&&this.setState({selected:this.props.selected})}},{key:"render",value:function(){var e=this.state.selected?this.props.selectedColor:this.bgColor,t=this.state.selected?this.props.selectedTextColor:"black";this.circleStyle=this.updateCircle(e,t);var a=this.state.selected?this.props.selectedText:this.initials;return h.a.createElement("div",{className:"p-grid p-align-center p-justify-center p-nogutter",style:this.circleStyle,onClick:this.toggleSelected},h.a.createElement("div",{className:"p-col-fixed",style:this.textStyle},a))}},{key:"hashCode",value:function(e){return e?e.split("").reduce((function(e,t){return(e<<5)-e+t.charCodeAt(0)|0}),0):0}}]),t}(m.Component),w=E;E.defaultProps={selectedColor:"#339CFF",selectedText:"\u2713",selectedTextColor:"white",size:"medium"};var O=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).containerStyle={flexWrap:"nowrap",cursor:"pointer",marginRight:"0em",marginLeft:"0em",marginTop:"0.5em"},a.boldText={fontSize:"14px",fontWeight:"bold",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},a.normalText={fontSize:"14px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},a.handleSelection=function(e){a.setState({selected:!a.state.selected}),a.props.onSelection&&a.props.onSelection(!a.state.selected,a.props.itemData)},a.showDetail=function(e){a.props.onShowDetails&&a.props.onShowDetails(a.props.itemData)},a.state={selected:a.props.selected},a.handleSelection=a.handleSelection.bind(Object(s.a)(a)),a.showDetail=a.showDetail.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.selected!==e.selected&&this.setState({selected:this.props.selected})}},{key:"render",value:function(){return h.a.createElement("div",{className:"p-grid p-align-center p-justify-start",style:this.containerStyle},h.a.createElement("div",{className:"p-col-fixed"},h.a.createElement(w,{selected:this.state.selected,nameField:this.props.nameField,itemData:this.props.itemData,onClick:this.handleSelection})),h.a.createElement("div",{className:"p-col",onClick:this.showDetail},h.a.createElement("div",{style:this.boldText},this.props.itemData[this.props.line1Field]),h.a.createElement("div",{style:this.normalText},this.props.itemData[this.props.line2Field]),h.a.createElement("div",{style:this.normalText},this.props.itemData[this.props.line3Field])))}}]),t}(m.Component),j=O;O.defaultProps={idField:"id",selected:!1,onSelection:function(){alert("Please add a selection callback")},onShowDetails:function(){alert("Please add a show details callback")}};a(111);var D=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).summaryTemplate=function(e){return h.a.createElement(j,{itemData:e,idField:a.props.idField,nameField:a.props.nameField,line1Field:a.props.line1Field,line2Field:a.props.line2Field,line3Field:a.props.line3Field,selected:"undefined"!==typeof a.props.selected.find((function(t){return t.id===e.id})),onSelection:a.onRowSelection,onShowDetails:function(){}})},a.buildColumnModel=function(e){var t;switch(e){case"mobile":return h.a.createElement(y.Column,{body:a.summaryTemplate});case"large":t=a.props.columnModel;break;case"medium":t=a.props.columnModel.slice(0,a.props.breakpointColumns[1]);break;case"small":default:t=a.props.columnModel.slice(0,a.props.breakpointColumns[0])}var l=t.map((function(e){return h.a.createElement(y.Column,{field:e.field,header:e.header,loadingBody:a.loadingText,style:{width:e.width+"px"},body:e.formatter,key:Number(e.id).toString()})}));return l.unshift(h.a.createElement(y.Column,{header:h.a.createElement(w,{initials:" ",bgColor:"transparent",selected:a.props.selected.length===a.props.data.length,onClick:a.changeAll}),body:a.buttonTemplate,style:{minWidth:"60px",width:"60px"},key:"selectAll"})),l},a.rowClassName=function(e){return{"p-highlight":a.isSelected(e),"detail-highlight":a.isDetailItem(e)}},a.isSelected=function(e){return a.props.selected.includes(e)&&!a.isDetailItem(e)},a.isDetailItem=function(e){return e===a.props.detailItem},a.getSize=function(e){var t=a.props.breakpoints;return e<t[0]?"mobile":e>=t[0]&&e<t[1]?"small":e>=t[1]&&e<t[2]?"medium":"large"},a.changeAll=function(e){a.props.selectionChangeCallback&&a.props.selectionChangeCallback(e?a.props.data:[])},a.buttonTemplate=function(e){return h.a.createElement(w,{size:"medium",nameField:a.props.nameField,itemData:e,selected:a.props.selected.includes(e),onClick:a.onRowSelection})},a.onRowSelection=function(e,t){var n=Object(l.a)(a.props.selected);if(e)n.push(t);else for(var i=0;i<n.length;i++)if(n[i].id===t.id){n.splice(i,1);break}a.props.selectionChangeCallback(n)},a.onRowClick=function(e){a.props.rowClickCallback(e.data)},a.onRowSelection=a.onRowSelection.bind(Object(s.a)(a)),a.rowClassName=a.rowClassName.bind(Object(s.a)(a)),a.changeAll=a.changeAll.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return h.a.createElement(b.a,{handleWidth:!0,render:function(t){var a=t.width;if(!a)return h.a.createElement("div",null);var l=e.getSize(a),n="mobile"===l;return h.a.createElement("div",{className:"p-grid p-align-center p-nogutter",style:"small"!==l?{flexWrap:"nowrap"}:{}},h.a.createElement(k.DataTable,{className:n?"no-table-header":"",tableClassName:n?"no-borders":"",value:e.props.data,resizableColumns:!n,reorderableColumns:!n,metaKeySelection:!1,selection:e.props.selected,onSelectionChange:function(t){return e.updateSelectedAndUrl(t.value)},scrollable:!0,scrollHeight:n?"calc(100vh - 70px)":"calc(100vh - 125px)",onRowClick:e.onRowClick,rowClassName:e.rowClassName},e.buildColumnModel(l)))}})}},{key:"loadingText",value:function(){return h.a.createElement("span",{className:"loading-text"})}}]),t}(m.Component),F=D;D.defaultProps={idField:"id",breakpoints:[480,839,1024],breakpointColumns:[3,6,9],selected:[],useOverlay:!0,rowClickCallback:function(){},selectionChangeCallback:function(){}};var I=a(114),A=a(62),N=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).toggleLabel=function(){a.label.current&&(a.label.current.hidden=!a.label.current.hidden)},a.debounce=function(e,t){var a;return function(){var l=this,n=arguments,i=function(){a=null,e.apply(l,n)};clearTimeout(a),a=setTimeout(i,t)}},a.search=a.debounce((function(e){a.props.searchCallback(e)}),400),a.label=h.a.createRef(),a.state={searchString:a.props.initialSearch},a.toggleLabel=a.toggleLabel.bind(Object(s.a)(a)),a.debounce=a.debounce.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return h.a.createElement("div",{className:"p-grid p-align-center p-nogutter",style:{marginBottom:"10px"}},this.props.label&&h.a.createElement("div",{ref:this.label,className:"p-col-fixed",style:{fontSize:"24px",marginRight:"20px"}},this.props.label),h.a.createElement("div",{className:"p-inputgroup p-col"},h.a.createElement(I.InputText,{onFocus:this.props.hideLabel?this.toggleLabel:function(){},onBlur:this.props.hideLabel?this.toggleLabel:function(){},style:{width:"100%"},placeholder:"Search",value:this.state.searchString,onChange:function(t){e.setState({searchString:t.target.value}),e.search(t.target.value)}})),this.props.menuModel&&h.a.createElement(h.a.Fragment,null,h.a.createElement(A.Menu,{model:this.props.menuModel,popup:!0,ref:function(t){return e.menu=t}}),h.a.createElement(g.Button,{className:"p-col-fixed",icon:"pi pi-bars",style:{marginLeft:"20px"},onClick:function(t){return e.menu.toggle(t)}})))}}]),t}(m.Component),M=N;N.defaultProps={hideLabel:!1};var R=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return h.a.createElement("div",{className:"p-grid p-align-center p-nogutter",style:{marginBottom:"10px"}},h.a.createElement(g.Button,{className:"p-col-fixed",icon:"pi pi-chevron-left",onClick:this.props.clearCallback}),h.a.createElement("div",{className:"p-col-fixed",style:{fontSize:"18px",marginLeft:"20px"}},this.props.selectedCount),h.a.createElement("div",{className:"p-col",style:{width:"100%"}},"\xa0"),h.a.createElement(g.Button,{className:"p-col-fixed",icon:"pi pi-trash",onClick:this.props.deleteCallback}),this.props.menuModel&&h.a.createElement(h.a.Fragment,null,h.a.createElement(A.Menu,{model:this.props.menuModel,popup:!0,ref:function(t){return e.menu=t}}),h.a.createElement(g.Button,{className:"p-col-fixed",icon:"pi pi-bars",style:{marginLeft:"20px"},onClick:function(t){return e.menu.toggle(t)}})))}}]),t}(m.Component),B=function(e){function t(){var e,a;Object(n.a)(this,t);for(var l=arguments.length,i=new Array(l),s=0;s<l;s++)i[s]=arguments[s];return(a=Object(r.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(i)))).render=function(){return h.a.createElement(h.a.Fragment,null,a.props.mobile&&0===a.props.selectedCount&&h.a.createElement(M,{key:a.props.initialSearchString,label:a.props.label,initialSearch:a.props.initialSearchString,searchCallback:a.props.searchCallback,hideLabel:!0,menuModel:a.props.menuModel}),a.props.mobile&&a.props.selectedCount>0&&h.a.createElement(R,{clearCallback:a.props.clearCallback,deleteCallback:a.props.deleteCallback,selectedCount:a.props.selectedCount,menuModel:a.props.menuModel}),!a.props.mobile&&h.a.createElement(M,{key:a.props.initialSearchString,label:a.props.label,initialSearch:a.props.initialSearchString,searchCallback:a.props.searchCallback,menuModel:a.props.menuModel}))},a}return Object(c.a)(t,e),t}(m.Component),P=(a(116),a(21)),T=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).mobile=!1,a.getInitialSelection=function(e){var t=[];if(a.props.location.search){var l=u.a.parse(a.props.location.search);if(l.selected)for(var n=l.selected.split(","),i=0;i<n.length;i++)for(var r=0;r<e.length;r++)if(parseInt(n[i])===e[r].id){t.push(e[r]);break}}return t},a.getInitialDetail=function(e){if(!a.mobile&&a.props.location.search){var t=u.a.parse(a.props.location.search);if(t.detail)for(var l=parseInt(t.detail),n=0;n<e.length;n++)if(l===e[n].id)return e[n]}return null},a.getInitialSearch=function(){if(a.props.location.search){var e=u.a.parse(a.props.location.search);if(e.search)return e.search}return""},a.buildMenu=function(){var e=[{label:"Selection",items:[{label:"Select All",command:function(){a.changeAll(!0)}},{label:"Select None",command:function(){a.changeAll(!1)}}]}];if(a.props.menuProvider){var t=a.props.menuProvider.buildMenu(a.state.selected);t&&e.push(t)}return a.state.selected.length>0&&e.push({label:"Delete",command:a.onDelete}),e},a.onSearch=function(e){a.setState({searchString:e});var t=u.a.parse(a.props.location.search);""===e?delete t.search:t.search=e,a.props.history.replace({search:u.a.stringify(t,{encode:!1})}),a.load({filter:e})},a.componentDidMount=function(){document.addEventListener("keydown",a.keyboardNav,!1);var e=a.getInitialSearch();a.props.dataService&&(a.props.dataService.list({filter:e}).then((function(t){var l=a.getInitialDetail(t),n=a.getInitialSelection(t);a.setState({loading:!1,data:t,totalRecords:t.length,selected:n,detailItem:l,initialSearchString:e}),a.props.selectionChangedCallback(n),a.overlayPanel&&l&&a.overlayPanel.show(l)})).catch((function(e){console.log(e),a.setState({loading:!1})})),a.setState({loading:!0}))},a.componentWillUnmount=function(){document.removeEventListener("keydown",a.keyboardNav,!1)},a.keyboardNav=function(e){if(a.state.detailItem){var t=a.state.data.indexOf(a.state.detailItem);38===e.keyCode&&t>0?a.setState({detailItem:a.state.data[t-1]},a.updateSelectedAndUrl):40===e.keyCode&&t<a.state.totalRecords-1&&a.setState({detailItem:a.state.data[t+1]},a.updateSelectedAndUrl)}},a.getSize=function(e,t){var l=a.props.breakpoints;return(e=t?e-a.props.detailWidth:e)<l[0]?"mobile":e>=l[0]&&e<l[1]?"small":e>=l[1]&&e<l[2]?"medium":"large"},a.onRowClicked=function(e){if(a.mobile)a.props.history.push(a.props.location.pathname+"/"+e.id);else{var t=u.a.parse(a.props.location.search);e===a.state.detailItem?(a.setState({detailItem:null}),a.overlayPanel&&a.overlayPanel.hide(),delete t.detail):(a.setState({detailItem:e}),a.overlayPanel&&a.overlayPanel.show(e),t.detail=e.id),a.props.history.replace({search:u.a.stringify(t,{encode:!1})})}},a.updateSelectedAndUrl=function(e){var t=u.a.parse(a.props.location.search);if(e){var l=a.buildIdList(e);l?t.selected=l:delete t.selected}a.state.detailItem?t.detail=a.state.detailItem.id:delete t.detail,a.props.history.replace({search:u.a.stringify(t,{encode:!1})}),e&&(a.setState({selected:e}),a.props.selectionChangedCallback(e))},a.buildIdList=function(e){if(0===e.length)return null;var t="";return e.forEach((function(a,l){t+=a.id,e.length>l+1&&(t+=",")})),t},a.changeAll=function(e){e?a.updateSelectedAndUrl(a.state.data):a.clearSelection()},a.clearSelection=function(){a.updateSelectedAndUrl([])},a.clearDetails=function(){a.setState({detailItem:null},a.updateSelectedAndUrl),a.props.useOverlay&&a.overlayPanel&&a.overlayPanel.hide()},a.onDelete=function(){a.props.confirmDelete?a.confirmDialog.current.setVisible(!0):a.deleteSelected()},a.deleteSelected=function(){a.props.dataService&&a.props.dataService.delete(a.state.selected).then((function(){a.confirmDialog.current.setVisible(!1),a.load(),a.clearSelection()})).catch((function(e){alert(e)}))},a.onSummarySelection=function(e,t){var n=Object(l.a)(a.state.selected);if(e)n.push(t);else for(var i=0;i<n.length;i++)if(n[i].id===t.id){n.splice(i,1);break}a.updateSelectedAndUrl(n)},a.load=function(e){a.props.dataService&&(a.props.dataService.list(e).then((function(e){a.setState({loading:!1,data:e,totalRecords:e.length})})),a.setState({loading:!0}))},a.label=h.a.createRef(),a.confirmDialog=h.a.createRef(),a.state={loading:!1,selected:[],data:[],totalRecords:0,detailItem:null,searchString:"",initialSearchString:""},a.props.dataService&&a.props.dataService.setReloadCallback(a.load),a.onRowClicked=a.onRowClicked.bind(Object(s.a)(a)),a.onSummarySelection=a.onSummarySelection.bind(Object(s.a)(a)),a.deleteSelected=a.deleteSelected.bind(Object(s.a)(a)),a.updateSelectedAndUrl=a.updateSelectedAndUrl.bind(Object(s.a)(a)),a.clearSelection=a.clearSelection.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=h.a.Children.map(this.props.children,(function(t){return h.a.cloneElement(t,{itemData:e.state.detailItem,onClose:e.clearDetails})}));return h.a.createElement(b.a,{handleWidth:!0,render:function(a){var l=a.width;if(!l)return h.a.createElement("div",null);var n=e.state.detailItem&&!e.props.useOverlay,i=e.getSize(l,n);e.mobile="mobile"===i&&!e.state.detailItem;var r=e.mobile?null:e.props.breakpoints[0]+"px";return h.a.createElement(h.a.Fragment,null,h.a.createElement("div",{className:"p-grid p-nogutter",style:{flexWrap:"nowrap"}},h.a.createElement("div",{className:"p-col",style:{flexGrow:1,flexShrink:0,flexBasis:r}},h.a.createElement(B,{label:"Devices",initialSearchString:e.state.initialSearchString,clearCallback:e.clearSelection,deleteCallback:e.onDelete,selectedCount:e.state.selected.length,searchCallback:e.onSearch,mobile:e.mobile,menuModel:e.buildMenu()}),h.a.createElement(F,{data:e.state.data,nameField:e.props.nameField,line1Field:e.props.line1Field,line2Field:e.props.line2Field,line3Field:e.props.line3Field,columnModel:e.props.columnModel,breakpoints:e.props.breakpoints,breakpointColumns:e.props.breakpointColumns,selected:e.state.selected,detailItem:e.state.detailItem,selectionChangeCallback:e.updateSelectedAndUrl,rowClickCallback:e.onRowClicked})),e.state.detailItem&&!e.mobile&&!e.props.useOverlay&&h.a.createElement("div",{className:"p-col detail-highlight",style:{minWidth:e.props.detailWidth,flexGrow:0,flexShrink:1,flexBasis:e.props.detailWidth}},t),h.a.createElement(C,{ref:e.confirmDialog,header:"Delete Selected Items?",message:"Are you sure you want to delete the selected items?",callBack:e.deleteSelected,maxWidth:"370px"}),!e.mobile&&e.props.useOverlay&&h.a.createElement(p.OverlayPanel,{className:"overlayStyle",ref:function(t){return e.overlayPanel=t}},t)),e.state.loading&&h.a.createElement(P.a,null))}})}}]),t}(m.Component);t.a=Object(f.f)(T);T.defaultProps={idField:"id",breakpoints:[480,839,1024],breakpointColumns:[3,6,9],useOverlay:!0,detailWidth:500,confirmDelete:!0,selectionChangedCallback:function(){}}}}]);
//# sourceMappingURL=2.d82e98a5.chunk.js.map
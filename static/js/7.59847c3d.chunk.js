(this.webpackJsonpresponsive=this.webpackJsonpresponsive||[]).push([[7],{53:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}a.d(t,"a",(function(){return i}))},54:function(e,t,a){"use strict";var n=a(8),r=a(12),i=a(10),l=a(9),o=a(11),c=a(0),s=a.n(c),u=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).tableStyle={width:"100%"},a.labelStyle={fontWeight:"bold",padding:"3px 10px 3px 0px",whiteSpace:"nowrap",verticalAlign:"top",width:"1px"},a.valueStyle={padding:"3px 0px 3px 20px",maxWidth:"1px"},a.buildRows=function(){for(var e=[],t=0;t<a.props.labels.length;t++)e.push(s.a.createElement("tr",{key:t},s.a.createElement("td",{style:a.labelStyle},a.props.labels[t]+":"),s.a.createElement("td",{style:a.valueStyle},a.props.values[t])));return e},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return s.a.createElement("table",{style:this.tableStyle},s.a.createElement("tbody",null,this.buildRows()))}}]),t}(c.Component);t.a=u},55:function(e,t,a){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a.d(t,"a",(function(){return n}))},56:function(e,t,a){"use strict";var n=a(55),r=a(53),i=a(8),l=a(10),o=a(9),c=a(11),s=a(0),u=function(e){function t(){var e,a;Object(i.a)(this,t);for(var c=arguments.length,s=new Array(c),u=0;u<c;u++)s[u]=arguments[u];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(s)))).config={offest:0,limit:20,sort:null,filter:null},a.list=function(e){if(e&&(a.config=Object(r.a)({},a.config,{},e)),a.config.filter&&0!==a.config.filter.length){var t=a.fakeData.filter((function(e){return e.user.includes(a.config.filter)}));return Promise.resolve(t)}return Promise.resolve(a.fakeData)},a.get=function(e){e="string"===typeof e?parseInt(e):e;for(var t=0;t<a.fakeData.length;t++)if(a.fakeData[t].id===e)return Promise.resolve(a.fakeData[t]);return Promise.reject("No such Id")},a.update=function(e){var t=a.fakeData.indexOf(e);return-1===t?Promise.reject("No such item with id: "+e.id):(a.fakeData[t]=e,Promise.resolve(e))},a.create=function(e){return a.fakeData.push(e),Promise.resolve(e)},a.delete=function(e){if(Array.isArray(e)){var t=Object(n.a)(a.fakeData);e.forEach((function(e){var a=t.indexOf(e);if(-1===a)return Promise.reject("No such item with id: "+e.id);t.splice(a,1)})),a.fakeData=t}else{var r=a.fakeData.indexOf(e);if(-1===r)return Promise.reject("No such item with id: "+e.id);a.fakeData.splice(r,1)}return Promise.resolve(a.fakeData)},a.dataChanged=function(){a.props.dataChangedCallback()},a.setReloadCallback=function(e){a.reloadCallback=e},a.reload=function(){a.reloadCallback()},a.fakeData=[{id:0,user:"Fred Flintstone",role:"student",manufacturer:"Samsung",type:"Galaxy",model:"S8",mac:"11:22:33:44:55:66",name:"Personal cell phone",status:"online",credentials:"certificate",enabled:!0,active:!0,added:1564076127e3,expires:1588523327e3},{id:1,user:"Fred Flintstone",role:"student",manufacturer:"Apple",type:"iPhone",model:"X",mac:"22:33:44:55:66:77",name:"Work cell phone",status:"online",credentials:"certificate",enabled:!0,active:!0,added:1563076127e3,expires:1566076127e3},{id:2,user:"Fred Flintstone",role:"student",manufacturer:"Roku",type:"Streaming Stick",model:"3800",mac:"33:44:55:66:77:88",name:"Livingroom Roku",status:"offline",credentials:"MPSK",enabled:!0,active:!0,added:1553076127e3,expires:1656076127e3},{id:3,user:"Barney Rubble",role:"faculty",manufacturer:"Roku",type:"Streaming Stick",model:"3800",mac:"44:55:66:77:88:99",name:"Bedroom Roku",status:"online",credentials:"MPSK",enabled:!0,active:!0,added:0xf5303a7d18,expires:0},{id:4,user:"Barney Rubble",role:"faculty",manufacturer:"Apple",type:"iPhone",model:"5",mac:"55:66:77:88:99:aa",name:"Personal cell phone",status:"online",credentials:"certificate",enabled:!0,active:!0,added:1500076127e3,expires:1550076127e3}],a}return Object(c.a)(t,e),t}(a.n(s).a.Component);t.a=u,u.defaultProps={dataChangedCallback:function(){}}},75:function(e,t,a){"use strict";a.r(t);var n=a(8),r=a(12),i=a(10),l=a(9),o=a(19),c=a(11),s=a(0),u=a.n(s),p=a(59),d=a.n(p),f=a(15),m=function(e){function t(){return Object(n.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"p-grid p-align-center p-nogutter"},u.a.createElement(f.Button,{className:this.props.buttonClass,icon:"pi pi-"+this.props.iconName,onClick:this.props.onClick}),u.a.createElement("div",{className:"p-col-fixed",style:{marginLeft:"5px"}},this.props.label)))}}]),t}(s.Component),b=m;m.defaultProps={iconName:"question",label:"No Label",onClick:function(){alert("Please add an onClick handle")}};var h=a(54),y=a(56),v=a(21),g=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(l.a)(t).call(this,e))).panelStyle={marginLeft:"20px"},a.onlineStyle={color:"green",fontSize:"18px",fontStyle:"bold"},a.offlineStyle={color:"red",fontSize:"18px",fontStyle:"bold"},a.buttonStyle={marginRight:"20px",marginBottom:"10px"},a.buildValues=function(e){var t="/user/"+e.userId,a="/role/"+e.roleId,n=[];n.push(e.enabled?"Yes":"No"),n.push(u.a.createElement(u.a.Fragment,null,u.a.createElement("a",{href:t},e.user)," (",u.a.createElement("a",{href:a},e.role),")")),n.push(e.name);var r=e.credentials;return r+="certificate"===r?" (expires in 234 days)":"",n.push(r),n.push(u.a.createElement(d.a,{date:e.added})),n.push(u.a.createElement(d.a,{date:e.lastSeen})),n},a.onClose=function(){a.props.onClose()},a.state={itemData:a.props.itemData},a.props.itemData||(a.dataService=new y.a),a.onClose=a.onClose.bind(Object(o.a)(a)),a.escFunction=a.escFunction.bind(Object(o.a)(a)),a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"escFunction",value:function(e){27===e.keyCode&&this.onClose()}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.escFunction,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.escFunction,!1)}},{key:"render",value:function(){var e=this,t=this.props.itemId?this.state.itemData:this.props.itemData;return t||this.props.itemId?!t&&this.props.itemId?(this.dataService.get(this.props.itemId).then((function(t){e.setState({itemData:t})}),(function(e){return{reason:e}})),u.a.createElement(v.a,null)):u.a.createElement("div",{style:this.panelStyle},u.a.createElement("div",{className:"p-grid p-align-center p-nogutter",style:{marginBottom:"10px"}},u.a.createElement("div",{className:"p-col-fixed",style:{fontSize:"24px",marginRight:"40px"}},"Device Details"),u.a.createElement("div",{className:"p-col-fixed",style:"online"===t.status?this.onlineStyle:this.offlineStyle},"online"===t.status?"Online":"Offline"),u.a.createElement("div",{className:"p-col",style:{width:"100%"}}),this.props.showClose&&u.a.createElement("i",{className:"p-col-fixed pi pi-times",onClick:this.onClose,style:{fontSize:"28px",color:"lightgrey",marginLeft:"40px",cursor:"pointer"}})),u.a.createElement("div",{style:{fontSize:"18px"}},t.manufacturer," ",t.type," ",t.model," (",t.mac,")"),u.a.createElement("div",{style:{margin:"20px"}},u.a.createElement(h.a,{labels:["Enabled","User","Name","Credentials","Added","Last Seen"],values:this.buildValues(t)})),u.a.createElement("div",{className:"p-grid p-align-center p-nogutter",style:{marginBottom:"10px"}},u.a.createElement("div",{className:"p-col-fixed",style:this.buttonStyle},u.a.createElement(b,{iconName:"power-off",label:"Disable",onClick:function(){alert("Clicked Disable")}})),u.a.createElement("div",{className:"p-col-fixed",style:this.buttonStyle},u.a.createElement(b,{iconName:"trash",label:"Delete",onClick:function(){alert("Clicked Delete")}})),u.a.createElement("div",{className:"p-col-fixed",style:this.buttonStyle},u.a.createElement(b,{iconName:"replay",label:"Revoke Certificate",onClick:function(){alert("Clicked Revoke")}}))),u.a.createElement("div",{style:{fontSize:"18px",marginTop:"20px"}},"Recent Activity"),u.a.createElement("div",{style:{margin:"20px"}},u.a.createElement(h.a,{labels:["An Hour ago","A day ago","3 days ago"],values:["Something interesting happened here","Not quite as interesting, but still interesting","OMG, this is really bad. Something needs to be done"]}))):null}}]),t}(s.Component);t.default=g;g.defaultProps={onClose:function(){},showClose:!0}}}]);
//# sourceMappingURL=7.59847c3d.chunk.js.map
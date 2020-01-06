(this.webpackJsonpresponsive=this.webpackJsonpresponsive||[]).push([[10],{138:function(e,t,a){"use strict";a.r(t);var n=a(8),i=a(12),r=a(10),l=a(9),s=a(11),o=a(0),c=a.n(o),u=a(74),d=a(63),m=a(57),h=a(58),p=a.n(h),f=a(6),v=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(l.a)(t).call(this,e))).columnModel=[{field:"name",header:"Name",width:120},{field:"username",header:"User Name",width:90},{field:"email",header:"e-mail",width:130},{field:"address.street",header:"Street",width:90},{field:"address.suite",header:"Suite",width:60},{field:"address.city",header:"City",width:80},{field:"address.zipcode",header:"Zip Code",width:70},{field:"phone",header:"Phone",width:120},{field:"website",header:"Web Site",width:80}],a.useOverlay=function(){var e=p.a.parse(a.props.location.search);return!e.useOverlay||"false"!==e.useOverlay},a.dataService=new m.a,a}return Object(s.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{style:{margin:"10px"}},c.a.createElement(u.a,{label:"Users",breakpoints:[600,1e3,1500],breakpointColumns:[3,7,10],columnModel:this.columnModel,dataService:this.dataService,nameField:"name",line1Field:"name",line2Field:"username",line3Field:"email",useOverlay:this.useOverlay()},c.a.createElement(d.default,null)))}}]),t}(o.Component);t.default=Object(f.f)(v)},57:function(e,t,a){"use strict";var n=a(53),i=a(8),r=a(10),l=a(9),s=a(11),o=a(0),c=a.n(o),u=a(64),d=a.n(u),m=function(e){function t(){var e,a;Object(i.a)(this,t);for(var s=arguments.length,o=new Array(s),c=0;c<s;c++)o[c]=arguments[c];return(a=Object(r.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).config={offest:0,limit:20,sort:null,filter:null},a.list=function(e){e&&(a.config=Object(n.a)({},a.config,{},e));var t=e&&e.filter?{name:e.filter}:{};return d.a.get("/users",{params:t}).then((function(e){return e.data}))},a.get=function(e){return d.a.get("/users/"+e).then((function(e){return e.data}))},a.update=function(e){return d.a.put("/users/"+e.id,JSON.stringify(e)).catch((function(e){throw e}))},a.create=function(e){return d.a.post("/users",JSON.stringify(e)).catch((function(e){throw e}))},a.delete=function(e){if(Array.isArray(e)){var t=[],a=!0,n=!1,i=void 0;try{for(var r,l=e[Symbol.iterator]();!(a=(r=l.next()).done);a=!0){var s=r.value;t.push(d.a.delete("/users/"+s.id))}}catch(o){n=!0,i=o}finally{try{a||null==l.return||l.return()}finally{if(n)throw i}}return d.a.all(t)}return d.a.delete("/users/"+e.id)},a.dataChanged=function(){a.props.dataChangedCallback()},a.setReloadCallback=function(e){a.reloadCallback=e},a.reload=function(){a.reloadCallback()},a}return Object(s.a)(t,e),t}(c.a.Component);t.a=m,m.defaultProps={dataChangedCallback:function(){}}},63:function(e,t,a){"use strict";a.r(t);var n=a(8),i=a(12),r=a(10),l=a(9),s=a(19),o=a(11),c=a(0),u=a.n(c),d=a(54),m=a(57),h=a(21),p=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(l.a)(t).call(this,e))).panelStyle={backgroundColor:"white",marginLeft:"20px"},a.onClose=function(){a.props.onClose()},a.buildValues=function(e){var t=[];return t.push(e.name),t.push(e.username),t.push(e.email),t.push(u.a.createElement(u.a.Fragment,null,u.a.createElement("div",null,e.address.street),u.a.createElement("div",null,e.address.suite),u.a.createElement("div",null,e.address.city),u.a.createElement("div",null,e.address.zipcode))),t.push(e.phone),t.push(u.a.createElement("a",{href:e.website},e.website)),t.push(u.a.createElement(u.a.Fragment,null,u.a.createElement("div",null,e.company.name),u.a.createElement("div",null,e.company.catchPhrase),u.a.createElement("div",null,e.company.bs))),t},a.state={itemData:a.props.itemData},a.props.itemData||(a.dataService=new m.a),a.onClose=a.onClose.bind(Object(s.a)(a)),a.escFunction=a.escFunction.bind(Object(s.a)(a)),a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"escFunction",value:function(e){27===e.keyCode&&this.onClose()}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.escFunction,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.escFunction,!1)}},{key:"render",value:function(){var e=this,t=null!=this.props.itemId?this.state.itemData:this.props.itemData;return t||this.props.itemId?!t&&this.props.itemId?(this.dataService.get(this.props.itemId).then((function(t){e.setState({itemData:t})}),(function(e){return{reason:e}})),u.a.createElement(h.a,null)):u.a.createElement("div",{style:this.panelStyle},u.a.createElement("div",{className:"p-grid p-align-center p-nogutter",style:{marginBottom:"10px"}},u.a.createElement("div",{className:"p-col-fixed",style:{fontSize:"24px",marginRight:"40px"}},"User Details (",t.id,")"),u.a.createElement("div",{className:"p-col",style:{width:"100%"}}),this.props.showClose&&u.a.createElement("i",{className:"p-col-fixed pi pi-times",onClick:this.onClose,style:{fontSize:"28px",color:"lightgrey",marginLeft:"40px",cursor:"pointer"}})),u.a.createElement("div",{style:{margin:"20px"}},u.a.createElement(d.a,{labels:["Name","User Name","e-mail","Address","Phone Number","Web Site","Company"],values:this.buildValues(t)}))):null}}]),t}(c.Component);t.default=p,p.defaultProps={onClose:function(){},showClose:!0}}}]);
//# sourceMappingURL=10.1cbc8543.chunk.js.map
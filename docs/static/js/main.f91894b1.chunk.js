(this.webpackJsonpresponsive=this.webpackJsonpresponsive||[]).push([[4],{21:function(e,t,a){"use strict";var n=a(8),l=a(12),r=a(10),c=a(9),i=a(11),o=a(0),s=a.n(o),u=a(26),m=(a(45),function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"flex"},s.a.createElement(u.ProgressSpinner,{className:"flex-center"}))}}]),t}(o.Component));t.a=m},33:function(e,t,a){e.exports=a(51)},38:function(e,t,a){},45:function(e,t,a){},48:function(e,t,a){},51:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(20),c=a.n(r),i=(a(38),a(8)),o=a(12),s=a(10),u=a(9),m=a(11),h=a(13),d=a(6),p=(a(39),a(40),a(41),a(24),a(21)),b=a(15),f=a(27),v=(a(48),function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={useOverlay:!0},e}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t="?useOverlay=";return t+=this.state.useOverlay?"true":"false",l.a.createElement("div",{className:"p-grid p-dir-col p-align-center p-nogutter"},l.a.createElement("p",{className:"p-col description"},"Master Detail display using a responsive table. The table displays more or fewer columns depending on available width. When the table becomes too narrow it switches to a single column with a compact display that roughly mimics gmail on a phone."),l.a.createElement("p",{className:"p-col description"},"The detail panel can be shown in an overlay panel or optionally in-line with the grid. When the available width is too small to show the detail panel, it will be navigated to instead, regardless of this setting."),l.a.createElement("div",null,l.a.createElement(f.Checkbox,{inputId:"check",onChange:function(t){e.setState({useOverlay:t.checked})},checked:this.state.useOverlay}),l.a.createElement("label",{htmlFor:"check",className:"p-checkbox-label"},"Use Overlay for Detail Panel")),l.a.createElement(h.b,{to:"/devices"+t},l.a.createElement(b.Button,{label:"Canned Data",style:{margin:"20px"},className:"p-button-raised p-col"})),l.a.createElement(h.b,{to:"/users"+t},l.a.createElement(b.Button,{label:"Network Data",className:"p-button-raised p-col"})))}}]),t}(n.Component)),E=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={data:[]},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=Object(n.lazy)((function(){return Promise.all([a.e(0),a.e(3),a.e(2),a.e(8)]).then(a.bind(null,140))})),t=Object(n.lazy)((function(){return Promise.all([a.e(3),a.e(7)]).then(a.bind(null,75))})),r=Object(n.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(10)]).then(a.bind(null,138))})),c=Object(n.lazy)((function(){return Promise.all([a.e(1),a.e(9)]).then(a.bind(null,63))})),i=Object(n.lazy)((function(){return a.e(11).then(a.bind(null,139))}));return l.a.createElement("div",null,l.a.createElement(h.a,null,l.a.createElement(n.Suspense,{fallback:l.a.createElement(p.a,null)},l.a.createElement(d.c,null,l.a.createElement(d.a,{exact:!0,path:"/",component:v}),l.a.createElement(d.a,{exact:!0,path:"/devices",render:function(t){return l.a.createElement(e,null)}}),l.a.createElement(d.a,{path:"/devices/:id",render:function(e){return l.a.createElement(t,{itemId:e.match.params.id,itemData:null,showClose:!1})}}),l.a.createElement(d.a,{exact:!0,path:"/users",render:function(e){return l.a.createElement(r,null)}}),l.a.createElement(d.a,{path:"/users/:id",render:function(e){return l.a.createElement(c,{itemId:e.match.params.id,itemData:null,showClose:!1})}}),l.a.createElement(d.a,{component:i})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[33,5,6]]]);
//# sourceMappingURL=main.f91894b1.chunk.js.map
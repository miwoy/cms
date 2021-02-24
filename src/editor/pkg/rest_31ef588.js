;/*!index.tsx*/
amis.define("8d0e5e4",function(e,t){"use strict";function a(e){r.default.render(o.default.createElement(u.default,null),e)}Object.defineProperty(t,"__esModule",{value:!0}),t.bootstrap=void 0;var c=e("849c8c1"),o=c.__importDefault(e("cc4bbf0")),r=c.__importDefault(e("3c5b02d")),u=c.__importDefault(e("4c5556c"));t.bootstrap=a});
;/*!loadMonacoEditor.ts*/
amis.define("800eaff",function(s,a){"use strict";function e(s){var a="/editor/n/monaco-editor/min/vs/loader.js",e=amis.require.loadJs(i(a));e.onload=function(){return n(window.require,s)}}function i(s){return s}function n(s,a){var e={"vs/nls":{availableLanguages:{"*":"zh-cn"}},paths:{vs:"/editor/n/monaco-editor/min/vs/editor/editor.main.js".replace(/\/vs\/.*$/,""),"vs/base/worker/workerMain":"/editor/n/monaco-editor/min/vs/base/worker/workerMain.js","vs/basic-languages/apex/apex":"/editor/n/monaco-editor/min/vs/basic-languages/apex/apex.js","vs/basic-languages/azcli/azcli":"/editor/n/monaco-editor/min/vs/basic-languages/azcli/azcli.js","vs/basic-languages/clojure/clojure":"/editor/n/monaco-editor/min/vs/basic-languages/clojure/clojure.js","vs/basic-languages/bat/bat":"/editor/n/monaco-editor/min/vs/basic-languages/bat/bat.js","vs/basic-languages/coffee/coffee":"/editor/n/monaco-editor/min/vs/basic-languages/coffee/coffee.js","vs/basic-languages/cpp/cpp":"/editor/n/monaco-editor/min/vs/basic-languages/cpp/cpp.js","vs/basic-languages/csharp/csharp":"/editor/n/monaco-editor/min/vs/basic-languages/csharp/csharp.js","vs/basic-languages/css/css":"/editor/n/monaco-editor/min/vs/basic-languages/css/css.js","vs/basic-languages/dockerfile/dockerfile":"/editor/n/monaco-editor/min/vs/basic-languages/dockerfile/dockerfile.js","vs/basic-languages/fsharp/fsharp":"/editor/n/monaco-editor/min/vs/basic-languages/fsharp/fsharp.js","vs/basic-languages/go/go":"/editor/n/monaco-editor/min/vs/basic-languages/go/go.js","vs/basic-languages/handlebars/handlebars":"/editor/n/monaco-editor/min/vs/basic-languages/handlebars/handlebars.js","vs/basic-languages/html/html":"/editor/n/monaco-editor/min/vs/basic-languages/html/html.js","vs/basic-languages/ini/ini":"/editor/n/monaco-editor/min/vs/basic-languages/ini/ini.js","vs/basic-languages/java/java":"/editor/n/monaco-editor/min/vs/basic-languages/java/java.js","vs/basic-languages/javascript/javascript":"/editor/n/monaco-editor/min/vs/basic-languages/javascript/javascript.js","vs/basic-languages/less/less":"/editor/n/monaco-editor/min/vs/basic-languages/less/less.js","vs/basic-languages/lua/lua":"/editor/n/monaco-editor/min/vs/basic-languages/lua/lua.js","vs/basic-languages/markdown/markdown":"/editor/n/monaco-editor/min/vs/basic-languages/markdown/markdown.js","vs/basic-languages/msdax/msdax":"/editor/n/monaco-editor/min/vs/basic-languages/msdax/msdax.js","vs/basic-languages/objective-c/objective-c":"/editor/n/monaco-editor/min/vs/basic-languages/objective-c/objective-c.js","vs/basic-languages/php/php":"/editor/n/monaco-editor/min/vs/basic-languages/php/php.js","vs/basic-languages/postiats/postiats":"/editor/n/monaco-editor/min/vs/basic-languages/postiats/postiats.js","vs/basic-languages/powershell/powershell":"/editor/n/monaco-editor/min/vs/basic-languages/powershell/powershell.js","vs/basic-languages/pug/pug":"/editor/n/monaco-editor/min/vs/basic-languages/pug/pug.js","vs/basic-languages/python/python":"/editor/n/monaco-editor/min/vs/basic-languages/python/python.js","vs/basic-languages/r/r":"/editor/n/monaco-editor/min/vs/basic-languages/r/r.js","vs/basic-languages/razor/razor":"/editor/n/monaco-editor/min/vs/basic-languages/razor/razor.js","vs/basic-languages/redis/redis":"/editor/n/monaco-editor/min/vs/basic-languages/redis/redis.js","vs/basic-languages/redshift/redshift":"/editor/n/monaco-editor/min/vs/basic-languages/redshift/redshift.js","vs/basic-languages/ruby/ruby":"/editor/n/monaco-editor/min/vs/basic-languages/ruby/ruby.js","vs/basic-languages/rust/rust":"/editor/n/monaco-editor/min/vs/basic-languages/rust/rust.js","vs/basic-languages/sb/sb":"/editor/n/monaco-editor/min/vs/basic-languages/sb/sb.js","vs/basic-languages/scheme/scheme":"/editor/n/monaco-editor/min/vs/basic-languages/scheme/scheme.js","vs/basic-languages/scss/scss":"/editor/n/monaco-editor/min/vs/basic-languages/scss/scss.js","vs/basic-languages/shell/shell":"/editor/n/monaco-editor/min/vs/basic-languages/shell/shell.js","vs/basic-languages/solidity/solidity":"/editor/n/monaco-editor/min/vs/basic-languages/solidity/solidity.js","vs/basic-languages/sql/sql":"/editor/n/monaco-editor/min/vs/basic-languages/sql/sql.js","vs/basic-languages/st/st":"/editor/n/monaco-editor/min/vs/basic-languages/st/st.js","vs/basic-languages/swift/swift":"/editor/n/monaco-editor/min/vs/basic-languages/swift/swift.js","vs/basic-languages/typescript/typescript":"/editor/n/monaco-editor/min/vs/basic-languages/typescript/typescript.js","vs/basic-languages/vb/vb":"/editor/n/monaco-editor/min/vs/basic-languages/vb/vb.js","vs/basic-languages/xml/xml":"/editor/n/monaco-editor/min/vs/basic-languages/xml/xml.js","vs/basic-languages/yaml/yaml":"/editor/n/monaco-editor/min/vs/basic-languages/yaml/yaml.js","vs/editor/editor.main":"/editor/n/monaco-editor/min/vs/editor/editor.main.js","vs/editor/editor.main.css":"/editor/n/monaco-editor/min/vs/editor/editor.main.css","vs/editor/editor.main.nls":"/editor/n/monaco-editor/min/vs/editor/editor.main.nls.js","vs/editor/editor.main.nls.zh-cn":"/editor/n/monaco-editor/min/vs/editor/editor.main.nls.zh-cn.js","vs/language/typescript/tsMode":"/editor/n/monaco-editor/min/vs/language/typescript/tsMode.js","vs/language/typescript/tsWorker":"/editor/n/monaco-editor/min/vs/language/typescript/tsWorker.js","vs/language/json/jsonMode":"/editor/n/monaco-editor/min/vs/language/json/jsonMode.js","vs/language/json/jsonWorker":"/editor/n/monaco-editor/min/vs/language/json/jsonWorker.js","vs/language/html/htmlMode":"/editor/n/monaco-editor/min/vs/language/html/htmlMode.js","vs/language/html/htmlWorker":"/editor/n/monaco-editor/min/vs/language/html/htmlWorker.js","vs/language/css/cssMode":"/editor/n/monaco-editor/min/vs/language/css/cssMode.js","vs/language/css/cssWorker":"/editor/n/monaco-editor/min/vs/language/css/cssWorker.js"}};Object.keys(e.paths).forEach(function(s){e.paths[s]=i(e.paths[s].replace(/\.js$/,""))}),s.config(e),/^(https?:)?\/\//.test(e.paths.vs)?window.MonacoEnvironment={getWorkerUrl:function(){return"data:text/javascript;charset=utf-8,"+encodeURIComponent("\n              self.MonacoEnvironment = {\n                  baseUrl: '"+e.paths.vs+"',\n                  paths: "+JSON.stringify(e.paths)+"\n              };\n              importScripts('/editor/n/monaco-editor/min/vs/base/worker/workerMain.js');")}}:delete window.MonacoEnvironment,s(["vs/editor/editor.main"],function(s){a(s)})}Object.defineProperty(a,"__esModule",{value:!0}),a.__mod__async__load=void 0,a.__mod__async__load=e});
;/*!route/NotFound.tsx*/
amis.define("0d8fb78",function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("849c8c1"),f=a.__importDefault(e("cc4bbf0")),l=e("f7998ad"),r=e("167c905");t.default=function(){return f.default.createElement(r.NotFound,{links:f.default.createElement(l.Link,{to:"/",className:"list-group-item"},f.default.createElement("i",{className:"fa fa-chevron-right text-muted"}),f.default.createElement("i",{className:"fa fa-fw fa-mail-forward m-r-xs"}),"去首页"),footerText:""})}});
;/*!component/AMISRenderer.tsx*/
amis.define("bf6b35d",function(e,t){"use strict";function r(e,t,r){void 0===r&&(r="page");var c=function(o){function c(){return null!==o&&o.apply(this,arguments)||this}return n.__extends(c,o),c.prototype.getEnv=function(){var e=this;if(this.env)return this.env;var t=this.props,a=t.store,o=i.getEnv(a),s=function(t,r){if(/^\/api\//.test(t))return t;t=t||"";var n=e.props.history,a=n.location,o=p.default.parse(a.search.substring(1));t=u.filter(t.replace(/\$\$/g,p.default.stringify(o)),o),t&&"#"===t[0]?t=a.pathname+a.search+t:t&&"?"===t[0]&&(t=a.pathname+t);var s=t.indexOf("?"),i=t.indexOf("#"),c=~s?t.substring(0,s):~i?t.substring(0,i):t,d=~s?t.substring(s,~i?i:void 0):"",h=~i?t.substring(i):r?a.hash:"";if(c){if("/"!=c[0]&&!/^\w+\:/.test(c)){var f=a.pathname,l=f.split("/");l.pop();for(var m=void 0;m=/^\.\.?\//.exec(c);)"../"===m[0]&&l.pop(),c=c.substring(m[0].length);c=l.concat(c).join("/")}}else c=a.pathname;return c+d+h},c=function(t){var r=e.props.history,n=s(t),a=r.location,o=n,i="",u=n.indexOf("?");if(~u&&(o=n.substring(0,u),i=n.substring(u)),i){if(o!==a.pathname||!a.search)return!1;var c=p.default.parse(a.search.substring(1)),d=p.default.parse(i.substring(1));return Object.keys(d).every(function(e){return d[e]===c[e]})}return o===a.pathname?!0:!1};return this.env=n.__assign(n.__assign({},o),{session:r,isCurrentUrl:c,updateLocation:t.updateLocation||function(t,r){var n=e.props.history;return"goBack"===t?n.goBack():/^https?\:\/\//.test(t)?window.location.href=t:void n[r?"replace":"push"](s(t,r))},jumpTo:t.jumpTo||function(t,r){var n=e.props.history;return"goBack"===t?n.goBack():(t=s(t),c(t)?void 0:r&&"url"===r.actionType?void(r.blank===!1?window.location.href=t:window.open(t,"_blank")):r&&r.blank?void window.open(t,"_blank"):void(/^https?:\/\//.test(t)?window.location.href=t:n.push(t)))},affixOffsetTop:t.embedMode?0:50,theme:a.theme})},c.prototype.render=function(){var r,o=this.props,s=(o.router,o.match),i=o.location,p=(o.history,o.store),c=o.schema,d=(o.jumpTo,o.updateLocation,o.embedMode,n.__rest(o,["router","match","location","history","store","schema","jumpTo","updateLocation","embedMode"])),h=c||e;return h.type||(h.type="page"),r=u.render(h,n.__assign(n.__assign({location:i,data:u.utils.createObject(n.__assign(n.__assign({},s.params),{amisStore:p,pathname:i.pathname,params:s.params}))},d),{propsTransform:t}),this.getEnv()),a.default.createElement(a.default.Fragment,null,r)},c.displayName="SchemaRenderer",c=n.__decorate([s.inject("store"),s.observer],c)}(a.default.Component);return o.withRouter(c)}Object.defineProperty(t,"__esModule",{value:!0}),t.schema2component=void 0;var n=e("849c8c1"),a=n.__importDefault(e("cc4bbf0")),o=e("6af3be1"),s=e("024943c"),i=e("2426036"),p=n.__importDefault(e("9c65a3c")),u=e("167c905");t.schema2component=r,t.default=r({type:"page",body:"It works"})});
;/*!component/AddPageModal.tsx*/
amis.define("3b1184e",function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("849c8c1"),a=e("bf6b35d");t.default=a.schema2component({type:"dialog",title:"新增页面",body:{type:"form",controls:[{type:"text",label:"名称",name:"label",validations:{maxLength:20},required:!0},{type:"text",label:"路径",name:"path",validations:{isUrlPath:!0},required:!0,validate:function(e,t){var n=!!e.pages.filter(function(e){return e.path===t}).length;return n?"当前路径已被占用，请换一个":""}},{type:"icon-picker",label:"图标",name:"icon"}]}},function(e){var t=e.onConfirm,a=e.pages,i=n.__rest(e,["onConfirm","pages"]);return n.__assign(n.__assign({},i),{data:{pages:a},onConfirm:function(e){return t&&t(e[0])}})})});
;/*!route/Preview.tsx*/
amis.define("816c31c",function(e,a){"use strict";function t(e,a){var t=d.matchPath(a.pathname,{path:e?e.replace(/\?.*$/,""):"",exact:!0,strict:!0});return!!t}Object.defineProperty(a,"__esModule",{value:!0});var n=e("849c8c1"),l=n.__importDefault(e("cc4bbf0")),i=e("024943c"),c=e("167c905"),d=e("6af3be1"),s=e("f7998ad"),r=n.__importDefault(e("0d8fb78")),o=n.__importDefault(e("bf6b35d")),u=n.__importDefault(e("3b1184e"));a.default=i.inject("store")(i.observer(function(e){function a(){return l.default.createElement("div",null,l.default.createElement("div",{className:"a-Layout-brandBar"},l.default.createElement("button",{onClick:m.toggleOffScreen,className:"pull-right visible-xs"},l.default.createElement("i",{className:"glyphicon glyphicon-align-justify"})),l.default.createElement("div",{className:"a-Layout-brand"},l.default.createElement("i",{className:"fa fa-paw"}),l.default.createElement("span",{className:"hidden-folded m-l-sm"},"AMIS 编辑器"))),l.default.createElement("div",{className:"a-Layout-headerBar"},l.default.createElement("div",{className:"hidden-xs p-t-sm pull-right"},l.default.createElement(c.Button,{size:"sm",className:"m-r-xs",level:"success",disabled:!0,disabledTip:"Todo..."},"全部导出"),l.default.createElement(c.Button,{size:"sm",level:"info",onClick:function(){return m.setAddPageIsOpen(!0)}},"新增页面"))))}function i(){var e=m.pages.map(function(e){return{label:e.label,path:"/"+e.path,icon:e.icon}}),a=e.map(function(e){return e.path});return l.default.createElement(c.AsideNav,{key:m.asideFolded?"folded-aside":"aside",navigations:[{label:"导航",children:e}],renderLink:function(e){var t=e.link,n=e.toggleExpand,i=e.classnames,d=e.depth;if(t.hidden)return null;var r=[];return t.children&&r.push(l.default.createElement("span",{key:"expand-toggle",className:i("AsideNav-itemArrow"),onClick:function(e){return n(t,e)}})),t.badge&&r.push(l.default.createElement("b",{key:"badge",className:i("AsideNav-itemBadge",t.badgeClassName||"bg-info")},t.badge)),t.icon?r.push(l.default.createElement("i",{key:"icon",className:i("AsideNav-itemIcon",t.icon)})):m.asideFolded&&1===d&&r.push(l.default.createElement("i",{key:"icon",className:i("AsideNav-itemIcon",t.children?"fa fa-folder":"fa fa-info")})),t.active||r.push(l.default.createElement("i",{key:"delete","data-tooltip":"删除","data-position":"bottom",className:"navbtn fa fa-times",onClick:function(e){e.preventDefault(),c.confirm("确认要删除").then(function(e){e&&m.removePageAt(a.indexOf(t.path))})}})),r.push(l.default.createElement("i",{key:"edit","data-tooltip":"编辑","data-position":"bottom",className:"navbtn fa fa-pencil",onClick:function(e){e.preventDefault(),h.push("/edit/"+a.indexOf(t.path))}})),r.push(l.default.createElement("span",{key:"label",className:i("AsideNav-itemLabel")},t.label)),t.path?t.active?l.default.createElement("a",null,r):l.default.createElement(s.Link,{to:"/"===t.path[0]?t.path:""+t.path},r):l.default.createElement("a",{onClick:t.onClick?t.onClick:t.children?function(){return n(t)}:void 0},r)},isActive:function(e){return t(e.path&&"/"===e.path[0]?e.path:""+e.path,p)}})}function f(e){m.addPage(n.__assign(n.__assign({},e),{schema:{type:"page",title:e.label,body:"这是你刚刚新增的页面。"}})),m.setAddPageIsOpen(!1)}var m=e.store,p=e.location,h=e.history;return l.default.createElement(c.Layout,{aside:i(),header:a(),folded:m.asideFolded,offScreen:m.offScreen},l.default.createElement(d.Switch,null,m.pages.map(function(e){return l.default.createElement(d.Route,{key:e.id,path:"/"+e.path,render:function(){return l.default.createElement(o.default,{schema:e.schema})}})}),l.default.createElement(d.Route,{component:r.default})),l.default.createElement(u.default,{show:m.addPageIsOpen,onClose:function(){return m.setAddPageIsOpen(!1)},onConfirm:f,pages:m.pages.concat()}))}))});
;/*!renderer/MyRenderer.tsx*/
amis.define("de955de",function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("849c8c1"),n=e("167c905"),u=r.__importDefault(e("cc4bbf0")),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r.__extends(t,e),t.prototype.render=function(){var e=this.props.target;return u.default.createElement("p",null,"Hello ",e,"!")},t.defaultProps={target:"world"},t=r.__decorate([n.Renderer({test:/\bmy-renderer$/,name:"my-renderer"})],t)}(u.default.Component);t.default=a});
;/*!editor/MyRenderer.tsx*/
amis.define("bef2b8d",function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("849c8c1"),n=e("39ea9ea"),a=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.tipName="自定义组件",t.settingsSchema={title:"自定义组件配置",controls:[{type:"tabs",tabsMode:"line",className:"m-t-n-xs",contentClassName:"no-border p-l-none p-r-none",tabs:[{title:"常规",controls:[{name:"target",label:"Target",type:"text"}]},{title:"外观",controls:[]}]}]},t}return r.__extends(t,e),t=r.__decorate([n.RendererEditor("my-renderer",{name:"自定义渲染器",description:"这只是个示例",type:"my-renderer",previewSchema:{type:"my-renderer",target:"demo"},scaffold:{type:"my-renderer",target:"233"}})],t)}(n.BasicEditor);t.default=a});
;/*!route/Editor.tsx*/
amis.define("218f7cb",function(e,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("849c8c1"),i=t.__importDefault(e("cc4bbf0")),o=e("39ea9ea"),n=e("024943c"),r=e("167c905");e("de955de"),e("bef2b8d");var d=-1,s=window.location.protocol+"//"+window.location.host,l="./editor.html";/^\/amis-editor-demo/.test(window.location.pathname)&&(s+="/amis-editor",l="/amis-editor-demo"+l);var c=s+"/schema.json";a.default=n.inject("store")(n.observer(function(e){function a(){window.parent.postMessage({type:"amis:detail",data:s.schema},"*")}function t(){window.parent.postMessage({type:"amis:close",data:!0},"*")}function n(){return i.default.createElement("div",{className:"editor-header clearfix box-shadow bg-dark"},i.default.createElement("div",{className:"navbar-brand text-lt font-thin"},"AMis 编辑器"),i.default.createElement("div",{className:"editor-preview"},"预览"," ",i.default.createElement(r.Switch,{value:s.preview,onChange:function(e){return s.setPreview(e)},className:"m-l-xs",inline:!0})),i.default.createElement("div",{className:"editor-preview"},"移动端"," ",i.default.createElement(r.Switch,{value:s.isMobile,onChange:function(e){return s.setIsMobile(e)},className:"m-l-xs",inline:!0})),i.default.createElement("div",{className:"editor-header-btns"},i.default.createElement("div",{className:r.classnames("btn-item"),onClick:a},"保存"),i.default.createElement("div",{className:"btn-item",onClick:t},"退出")))}var s=e.store,m=(e.location,e.history,e.match),u=parseInt(m.params.id,10);return u!==d&&(d=u,window.addEventListener("message",function(e){if(e.data.data){var a=e.data.data;a.body=a.body&&"string"==typeof a.body?JSON.parse(a.body):a.body,a.toolbar=a.toolbar&&"string"==typeof a.toolbar?JSON.parse(a.toolbar):a.toolbar,s.updateSchema(e.data.data)}})),i.default.createElement(r.Layout,{header:n(),headerFixed:!1},i.default.createElement(o.Editor,{theme:"default",preview:s.preview,value:s.schema,onChange:function(e){return s.updateSchema(e)},className:"is-fixed",$schemaUrl:c,iframeUrl:l,isMobile:s.isMobile}))}))});
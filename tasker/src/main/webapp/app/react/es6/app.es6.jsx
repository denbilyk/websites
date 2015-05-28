import "../../styles/main.scss";
import React from "react/addons";
import MicroEvent from 'microevent';
import Utils from './Utils.es6.jsx';
import PanelBox from './PanelBox.es6.jsx';
import TaskActions from '../../model/es6/TaskActions.es6.jsx'
import GlobalStore from '../../model/es6/GlobalStore.es6.jsx'

MicroEvent.mixin(GlobalStore);
const store = new GlobalStore();
const ta = new TaskActions(store);
const u = new Utils();
React.render(<PanelBox ta={ta} st={store} u={u}/>, document.getElementById('content'));
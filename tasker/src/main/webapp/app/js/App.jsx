import "../styles/main.scss";
import React from "react/addons";
import MicroEvent from "microevent";
import Utils from "./components/Utils.jsx";
import PanelBox from "./components/PanelBox.jsx";
import TaskActions from "./actions/TaskActions.jsx";
import GlobalStore from "./actions/GlobalStore.jsx";

MicroEvent.mixin(GlobalStore);
const store = new GlobalStore();
const ta = new TaskActions(store);
const u = new Utils();
React.render(<PanelBox ta={ta} st={store} u={u}/>, document.getElementById("content"));

import React from "react/addons";
import Utils from './Utils.es6.jsx';
import TaskBox from './TaskBox.es6.jsx';

class ControlBox extends React.Component {

    render() {
        return (
            <div className="controls">
                <div className="add" id="add_b"></div>
            </div>
        );
    }
}

class PanelBox extends React.Component {

    render() {
        let utils = new Utils();
        return (
            <div className="panel-box">
                <TaskBox id={utils.id()}/>
                <ControlBox />
            </div>
        );
    }
}
export {PanelBox, ControlBox};
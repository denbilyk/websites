import TaskBox from './TaskBox.es6.jsx';
import Utils from './Utils.es6.jsx';
import ControlBox from './ControlBox.es6.jsx'
let React = require('react');

let PanelBox = React.createClass({

    render: function () {
        return (
            <div className="panel-box">
                <TaskBox id={Utils.guid()}/>
                <ControlsBox />
            </div>
        );
    }
});

React.render(<PanelBox />, document.getElementById('content'));
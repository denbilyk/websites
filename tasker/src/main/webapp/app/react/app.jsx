require("../styles/main.scss");
var React = require("react/addons");
var TaskBox = require('./TaskBox.jsx');
var Utils = require('./Utils.jsx');

var ControlsBox = React.createClass({

    render: function () {
        return (
            <div className="controls">
                <div className="add" id="add_b"></div>
            </div>
        );
    }
});

var PanelBox = React.createClass({

    render: function () {
        return (
            <div className="panel-box">
                <TaskBox id={Utils.guid()}/>
                <ControlsBox />
            </div>
        );
    }
});

React.render(
    <PanelBox />,
    document.getElementById('content')
);
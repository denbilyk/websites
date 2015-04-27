app = app || {};

var TaskBox = app.TaskBox;
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
                <TaskBox id={app.Utils.guid()}/>
                <ControlsBox />
            </div>
        );
    }
});

React.render(
    <PanelBox />,
    document.getElementById('content')
);
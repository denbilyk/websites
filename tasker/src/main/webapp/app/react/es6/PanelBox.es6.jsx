import React from "react/addons";
import MicroEvent from 'microevent';
import TaskBox from './TaskBox.es6.jsx';
import TaskActions from '../../model/es6/TaskActions.es6.jsx'
import GlobalStore from '../../model/es6/GlobalStore.es6.jsx'

class ControlBox extends React.Component {

    handleOnClick(event) {
        console.log("onClick");
        if (this.props.ta.size() != 10) {
            this.props.ta.addNew(this.props.u.id(), '');
        }
        else {
            alert("No more tasks")
        }
    }

    render() {
        return (
            <div className="controls">
                <div className="add" id="add_b" onClick={this.handleOnClick.bind(this)}></div>
            </div>
        );
    }
}

export default class PanelBox extends React.Component {

    constructor(props) {
        super(props);
        this.store = this.props.st;
        this.state = {items: ''};
        console.log('panel box constructor');

    }

    componentDidMount() {
        console.log('component did mount');
        this.store.bind('change', this.handleChange.bind(this));
        this.setState({items: this.getItems()});
    }

    componentWillUnmount() {
        console.log('unmount');
        this.store.unbind('change', this.handleChange.bind(this));
    }

    handleChange() {
        console.log('handle change');
        console.log(this.state.items);
        this.setState({items: this.getItems()});

    }

    getItems() {
        let utils = this.props.u;
        let items = this.props.ta.getAll();
        console.log(items);
        return items.map(function (item) {
            return (
                <TaskBox
                    id={utils.id()}
                    key={utils.guid()}
                    item={item}
                    ta={this.props.ta}
                    u={this.props.u}
                    />
            );
        }, this);
    }

    render() {
        return (
            <div className="panel-box">
                {this.state.items}
                <ControlBox ta={this.props.ta} u={this.props.u}/>
            </div>
        );

    }
}
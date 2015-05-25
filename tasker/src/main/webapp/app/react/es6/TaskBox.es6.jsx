/*
 * TaskBox Component
 * */
import React from "react/addons";
import TaskActions from '../../model/es6/TaskActions.es6.jsx'

export default class TaskBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {complete: false, payload:this.props.item};
    }

 /*   save(event) {
        let value = event.target.value;
        console.log(value);
        this.props.ta.addNew(value)
    }*/

    handleChange() {
        this.setState({complete: !this.state.complete});
    }

    handlerKeyDown(event) {
        if (event.keyCode === 13) {
            let _value = event.target.value;
            this.props.ta.update(this.state.payload.id, _value);
            this.props.ta.addNew(this.props.u.id(),' ');
        }

    }

    render() {
        return (
            <div className="task-box">
                <input type="checkbox" id={this.props.id} key={this.props.key} onChange={this.handleChange.bind(this)}/>
                <label htmlFor={this.props.id}/>
                <input type="text" disabled={this.state.complete} defaultValue={this.state.payload.value} id={this.state.payload.id}
                       onKeyDown={this.handlerKeyDown.bind(this)}/>

                <div className="rem"/>
            </div>
        );
    }
}

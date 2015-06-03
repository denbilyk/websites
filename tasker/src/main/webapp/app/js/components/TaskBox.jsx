import React from "react/addons";

export default class TaskBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {payload: this.props.item};
    }

    componentDidMount() {
        this.refs.textInp.getDOMNode().focus();
    }

    handleChange() {
        let complete = !this.state.payload.complete;
        this.setState({complete: complete});
        this.props.ta.updateComplete(this.state.payload.id, complete);
    }

    handlerKeyDown(event) {
        if (event.keyCode === 13) {
            let newValue = event.target.value;
            this.props.ta.update(this.state.payload.id, newValue, this.state.payload.complete);
            if (this.props.ta.size() !== 10) {
                this.props.ta.addNew(this.props.u.id(), "");
            } else {
                alert("No more tasks");
            }
        }

    }

    handleRemove() {
        this.props.ta.remove(this.state.payload.id);
    }

    render() {
        return (
            <div className="task-box">
                <input type="checkbox"
                       id={this.props.id}
                       key={this.props.key}
                       onChange={this.handleChange.bind(this)}
                       checked={this.state.payload.complete}/>

                <label htmlFor={this.props.id}/>

                <input type="text"
                       disabled={this.state.payload.complete}
                       defaultValue={this.state.payload.value}
                       id={this.state.payload.id}
                       onKeyDown={this.handlerKeyDown.bind(this)}
                       ref="textInp"/>

                <div className="rem"
                     onClick={this.handleRemove.bind(this)}
                    />
            </div>
        );
    }
}

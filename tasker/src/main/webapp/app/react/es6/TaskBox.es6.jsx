/*
* TaskBox Component
* */
let React = require('react');
export default class TaskBox extends React.Component {
     getInitialState() {
        return {
            complete: false
        };
    }

    handleChange() {
        this.setState({
            complete: !this.state.complete
        });
    }


    handleKeyDown(event) {
        console.log(event.which)
    }


    render() {
        return (
            <div className="task-box">
                <input type="checkbox" id={this.props.id} onChange={this.handleChange}/>
                <label htmlFor={this.props.id}/>
                <input type="text" disabled={this.state.complete} onKeyDown={this.handleKeyDown}/>

                <div className="rem"/>
            </div>
        );
    }
}

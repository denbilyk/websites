var TaskBox = React.createClass({
    getInitialState: function () {
        return {
            complete: false
        };
    },

    handleChange: function () {
        this.setState({
            complete: !this.state.complete
        });
    },


    handleKeyDown: function (event) {
        console.log(event.which)
    },


    render: function () {
        return (
            <div className="task-box">
                <input type="checkbox" id={this.props.id} onChange={this.handleChange}/>
                <label htmlFor={this.props.id}/>
                <input type="text" disabled={this.state.complete} onKeyDown={this.handleKeyDown}/>

                <div className="rem"/>
            </div>
        );
    }
});
module.exports = TaskBox;


import React, { Component } from 'react';
import enhance from '../hoc/wrapInputBox';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priority: 'Medium',
            dueDate: ''
        };
    }

    handlePriorityChange = (e) => {
        this.setState({ priority: e.target.value });
    };

    handleDueDateChange = (e) => {
        this.setState({ dueDate: e.target.value });
    };

    handleAddTask = (e) => {
        const { value, addNew } = this.props;
        const { priority, dueDate } = this.state;

        if (e.key === 'Enter' && value.trim()) {
            addNew(value, priority, dueDate);
            this.setState({ priority: 'Medium', dueDate: '' });
        }
    };

    render() {
        const { value, handleChange } = this.props;

        return (
            <div>
                <input
                    autoFocus
                    type="text"
                    className="form-control add-todo"
                    value={value}
                    onKeyUp={this.handleAddTask}
                    onChange={handleChange}
                    placeholder="Add New Task"
                />
                <div style={{ marginTop: '10px' }}>
                    <label>Priority: </label>
                    <select value={this.state.priority} onChange={this.handlePriorityChange}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <label style={{ marginLeft: '10px' }}>Due Date: </label>
                    <input
                        type="date"
                        value={this.state.dueDate}
                        onChange={this.handleDueDateChange}
                    />
                </div>
            </div>
        );
    }
}

export default enhance(InputBox);

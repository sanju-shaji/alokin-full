

import React from 'react';
import CheckBox from './CheckBox';

export default function TodoItem(props) {
    const { data, changeStatus } = props;

    // Change handler to update task status
    const handleChange = (checked) => changeStatus(data.id, checked);

    // Dynamic class assignment based on task completion status
    const className =
        'todo-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');

    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox checked={data.completed} onChange={handleChange} /> {data.text}
                </label>
            </div>
            <div style={{ fontSize: '0.9em', color: '#555', marginLeft: '20px' }}>
                <span>Priority: {data.priority}</span>
                <span style={{ marginLeft: '15px' }}>
                    Due Date: {data.dueDate ? data.dueDate : 'None'}
                </span>
            </div>
        </li>
    );
}


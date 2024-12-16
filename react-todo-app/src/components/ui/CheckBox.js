import React, { Component } from 'react';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        };
    }

    handleChange(e) {
        const { checked } = e.target;

        // If task is being marked as completed, show confirmation dialog
        if (checked) {
            const confirm = window.confirm("Are you sure you want to mark this task as completed?");
            if (!confirm) {
                // Reset the checkbox to its previous state if user cancels
                e.target.checked = false;
                return;
            }
        }

        // Update state and notify parent component
        this.setState({ checked });
        this.props.onChange(checked);
    }

    render() {
        return (
            <input
                type="checkbox"
                checked={this.state.checked}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

export default CheckBox;

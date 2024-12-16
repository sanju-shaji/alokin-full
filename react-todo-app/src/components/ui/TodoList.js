


import React, { Component } from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import { applyFilter, search, FILTER_ACTIVE } from '../../services/filter';

const priorityOrder = { High: 1, Medium: 2, Low: 3 };

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'none',
        };
    }

    setSortBy = (sortBy) => {
        this.setState({ sortBy });
    };

    sortItems = (items) => {
        const { sortBy } = this.state;
        switch (sortBy) {
            case 'dueDateAsc':
                return [...items].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            case 'dueDateDesc':
                return [...items].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
            case 'priority':
                return [...items].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            default:
                return items;
        }
    };

    render() {
        const { list, filter, mode, query } = this.props.data;
        const { addNew, changeFilter, changeStatus, changeMode, setSearchQuery } = this.props.actions;

        const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;
        const items = search(applyFilter(list, filter), query);
        const sortedItems = this.sortItems(items);

        return (
            <div className="container">
                <div className="row">
                    <div className="todolist">
                        <Header {...{ addNew, mode, query, setSearchQuery }} />
                        
                        {/* Sorting options UI */}
                        <div className="sorting-options">
                            <button onClick={() => this.setSortBy('dueDateAsc')}>Sort by Due Date (Asc)</button>
                            <button onClick={() => this.setSortBy('dueDateDesc')}>Sort by Due Date (Desc)</button>
                            <button onClick={() => this.setSortBy('priority')}>Sort by Priority</button>
                        </div>
                        
                        <FilteredList {...{ items: sortedItems, changeStatus }} />
                        <Footer {...{ activeItemCount, filter, changeFilter, mode, changeMode }} />
                        <Info {...{ mode }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList;


import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from "../actions/index";

function Home(props) {
    const {todos} = props;

    return (
        <ul>
            {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    );
};

const mapStateToProps = state => {
    return {
        todos: state.todos
    };
};

const loadData = store => {
    return store.dispatch(fetchTodos('todos'));
}

Home.defaultProps = {
    todos: [],
    fetchTodos: () => {}
};

export default {
    component: connect(
        mapStateToProps,
        { fetchTodos }
    )(Home),
    loadData
};
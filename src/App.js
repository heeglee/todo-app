import React, { useState, useRef, useCallback, useReducer } from 'react';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// PERFORMANCE TEST
function createBulkTodos() {
    const array = [];
    for (let i = 0; i <= 2500; i++) {
        array.push({
            id: i,
            text: `TODO ${i}`,
            checked: false,
        });
    }

    return array;
}

function todoReducer(todos, action) {
    switch (action.type) {
        case 'INSERT':
            return todos.concat(action.todo);
        case 'REMOVE':
            return todos.filter(todo => todo.id !== action.id);
        case 'TOGGLE':
            return todos.map(todo =>
                todo.id === action.id ? {...todo, checked: !todo.checked} : todo
            );
        default:
            return todos;
    }
}

const App = () => {
    const [todos, setTodos] = useState(createBulkTodos);
    // const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

    const nextId = useRef(2501);

    const onInsert = useCallback(text => {
        const todo = {
            id: nextId.current,
            text,
            checked: false,
        };

        setTodos(todos => todos.concat(todo));
        // dispatch({ type: 'INSERT', todo });
        nextId.current++;
    }, []);

    const onRemove = useCallback(id => {
        // dispatch({ type: 'REMOVE', id });
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }, []);

    const onToggle = useCallback(id => {
        // dispatch({ type: 'TOGGLE', id });
        setTodos(todos => todos.map(todo =>
            todo.id === id ? {...todo, checked: !todo.checked} : todo
        ));
    }, []);

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert} />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    );
};

export default App;
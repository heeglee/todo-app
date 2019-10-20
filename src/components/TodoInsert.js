import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(e => {
        e.preventDefault();
        onInsert(value);
        setValue('');
    }, [onInsert, value]);

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="Input your TODO" value={value} onChange={onChange} />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;
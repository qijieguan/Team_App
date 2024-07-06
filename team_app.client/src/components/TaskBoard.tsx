import '../styles/taskboard.css';
import Data from '../JSON/Task.json';

import { useEffect, useState } from 'react';

import Task from './Task.tsx';

import uuid from 'react-uuid';

const TaskBoard = () => {

    useEffect(() => {
        //console.log(Data);
    }, [])

    return (
        <section className="task-board grid">
            <h1 className="task-board-label">Tasks Overview</h1>
            {Data.length > 0 &&
                Data.map(task => <Task key={uuid()} task={task} />)
            }
        </section>
    )
}

export default TaskBoard;
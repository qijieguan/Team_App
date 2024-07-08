import '../styles/taskboard.css';
import { GiProgression } from "react-icons/gi";
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
            <label className="task-board-label flex">
                <h1>Tasks Overview</h1>
                <GiProgression className="icon" />
            </label>
            {Data.length > 0 &&
                Data.map(task => <Task key={uuid()} task={task} taskId={uuid()} />)
            }
        </section>
    )
}

export default TaskBoard;
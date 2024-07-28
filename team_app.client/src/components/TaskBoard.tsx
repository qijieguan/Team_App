import '../styles/taskboard.css';
import { GiProgression } from "react-icons/gi";
import Data from '../JSON/Task.json';

import { useEffect, useState } from 'react';

import axios from 'axios';
import uuid from 'react-uuid';

import Task from './Task.tsx';

const TaskBoard = () => {
    //const [Tasks, setTasks] = useState(Array<object>);
    const [Tasks, setTasks] = useState(Data);

    const baseURL = "http://localhost:5074";

    useEffect(() => {
        //if (Tasks.length <= 0) { GetData(); }
    }, []);

    const GetData = async () => {
        await axios.get(baseURL + '/api/tasksdata/get')
            .then((response) => {
                console.log(response.data);
                if (response.data.constructor === Object) { setEntries(Data); }
                else { setTasks(response.data); }
            });
    }

    const setEntries = async (entries: Array<object>) => {
        ClearTable();
        await axios.post(baseURL + '/api/tasksdata/insertentries', entries);
        GetData();
    }

    const ClearTable = async () => {
        await axios.post(baseURL + '/api/tasksdata/clear');
        setTasks([]);
    }

    const handleEdit = (edits: object) => {
        console.log(edits);
    }

    return (
        <section className="task-board grid">
            <label className="task-board-label flex">
                <h1>Tasks Overview</h1>
                <GiProgression className="icon" />
            </label>
            {Tasks.length > 0 &&
                Tasks.map(task => <Task key={uuid()} task={task} taskId={uuid()} handleEdit={handleEdit}/>)
            }
        </section>
    )
}

export default TaskBoard;